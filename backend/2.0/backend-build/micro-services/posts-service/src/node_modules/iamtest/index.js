const { map, some, pull, clone, concat, padEnd, castArray, isArray, without, uniq, keys } = require('lodash');
const async = require('async');
const minimatch = require('minimatch');
const fs = require('fs');
const klawSync = require('klaw-sync');
const chalk = require('chalk');
const path = require('path');
const { fork } = require('child_process');
const { PassThrough } = require('stream');
const debug = require('util').debuglog('iamtest');
/*  lazy load
 *  const tapSpec = require('tap-spec');
 *  const tapSummary = require('tap-summary');
 *  const { amTapDot } = require('am-tap-dot');
 *  const StaticServer = require('static-server');
 */
const Child = require('./lib/Child');
const Watcher = require('./lib/Watcher');

const config = require('./lib/config')(path.join(process.cwd(), '.iamtest.js'));
const argv = require('./lib/yargs')();

const isMaster = !argv.child;
const isSilent = argv.reporter === 'silent';
const argsPaths = map(argv._, p => path.resolve(process.cwd(), p));

function ipcSend(message) {
    if (process.send) process.send(message);
}

function outputWrite(str) {
    if (!isSilent) {
        process.stdout.write(str);
    }
}

function verbose(...args) {
    if (argv.verbose) {
        outputWrite(`${chalk.cyan(args[0])}\n${args.slice(1).join('')}`);
    }
}

function tapeReporterStream() {
    switch (argv.reporter) {
        case 'tape':
        case 'silent':
            return new PassThrough();
        case 'spec':
            // eslint-disable-next-line global-require
            return require('tap-spec')();
        case 'summary':
            // eslint-disable-next-line global-require
            return require('tap-summary')({ ansi: true, progress: true });
        case 'dots':
            // eslint-disable-next-line global-require, import/newline-after-import
            return require('am-tap-dot').amTapDot();
        default:
            /* istanbul ignore next */
            throw new Error('invalid reporter value');
    }
}

function getTestFiles() {
    // if only single test file then do not ignore it
    if (argsPaths.length === 1 && !argsPaths[0].includes('*')) {
        return argsPaths;
    }
    return klawSync(config.rootPath)
        .filter((item) => {
            const filepath = item.path;
            if (minimatch(filepath, '!*.js', { matchBase: true })) return false;
            if (some(config.ignorePath, v => minimatch(filepath, v))) return false;
            if (argsPaths.length && !some(argsPaths, v => minimatch(filepath, v))) return false;
            return true;
        })
        .map(item => item.path);
}

function getCoverageFiles() {
    const coverageDir = argv.coverageDir || path.join(process.cwd(), 'coverage');
    const coverageReportPath = path.join(coverageDir, 'coverage-summary.json');
    if (!fs.existsSync(coverageReportPath)) {
        throw new Error(`Coverage report file ${coverageReportPath} not found`);
    }
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const report = require(coverageReportPath);
    return pull(keys(report), 'total');
}

function serveCoverageHtml(port) {
    // eslint-disable-next-line global-require
    const StaticServer = require('static-server');

    const server = new StaticServer({
        rootPath: path.join(process.cwd(), 'coverage'),
        name: 'Coverage Report',
        port,
    });
    server.start(() => {
        outputWrite('  \n');
        outputWrite(`  View coverage report at ${chalk.cyan(`http://localhost:${server.port}`)}\n`);
        outputWrite('  Press ctrl+c to exit...\n');
    });
}

function filterChildArgs(args) {
    const _args = clone(args);
    const ix = _args.indexOf('--web');
    if (_args.includes('--web')) {
        _args.splice(ix, 2);
    }
    pull(_args, '-w', '--watch');
    ipcSend({ name: 'filter', body: _args });
    return _args;
}

function runWatcher(args) {
    let child = new Child(null, [], { verbose });
    const watcher = new Watcher({ verbose });
    const watchingFiles = concat(getTestFiles(), getCoverageFiles());
    const _args = filterChildArgs(args);
    watcher
        .watch(watchingFiles)
        .on('change', () => {
            ipcSend({ name: 'watcher event' });
            child.kill();
        })
        .on('debounce', () => {
            child.exit().then(() => {
                child = new Child(config.nycPath, _args, { verbose });
                ipcSend({ name: 'child fork', body: { id: child.id, script: config.nycPath, args: _args } });
                child.process.once('exit', () => {
                    ipcSend({ name: 'child exit', body: { id: child.id } });
                    watcher.watch(concat(getTestFiles(), getCoverageFiles()));
                });
                // bubble child message
                child.process.on('message', (message) => {
                    ipcSend(message);
                });
            });
        });
    process.nextTick(() => {
        ipcSend({ name: 'run watcher', body: watchingFiles });
    });
}

function outputFilenameHeader(filepath, isFirst) {
    let filenameHeader = '';
    const relativeFilePath = path.relative(config.rootPath, filepath);
    if (argv.reporter === 'tape') {
        const sof = isFirst ? '#\n#' : '\n#\n#';
        const eof = '\n#\n';
        filenameHeader = `${sof}${relativeFilePath}${eof}`;
    } else if (argv.reporter === 'dots') {
        const sof = isFirst ? '\n ' : '\n\n ';
        const eof = isFirst ? '' : '\n';
        const header = chalk.bgWhite.black(` ${padEnd(relativeFilePath, 80, ' ')}`);
        filenameHeader = `${sof}${header}${eof}`;
    } else if (!isSilent) {
        const sof = isFirst ? '\n ' : '\n\n ';
        const eof = isFirst ? '\n' : '\n';
        const header = chalk.bgWhite.black(` ${padEnd(relativeFilePath, 80, ' ')}`);
        filenameHeader = `${sof}${header}${eof}`;
    }
    return filenameHeader;
}

function runTest(callback) {
    const reporter = tapeReporterStream();
    if (!isSilent) {
        reporter.pipe(process.stdout);
    }
    const testFiles = getTestFiles();
    let exitCode = 0;
    debug(`TEST FILES: ${testFiles.length}`, `\n  • ${testFiles.join('\n  • ')}\n`);
    async.eachSeries(testFiles, (filePath, cb) => {
        let execPath = 'node';
        if (argv.flow) {
            execPath = config.flowNodeBinPath;
        }
        if (argv.babel) {
            execPath = config.babelNodeBinPath;
        }
        debug('RUN TEST:', `${execPath} ${filePath}`);
        const child = fork(filePath, [], {
            silent: true,
            execPath,
        });
        outputWrite(outputFilenameHeader(filePath, filePath === testFiles[0]));
        reporter.emit('dot-line-break');
        child.stdout.on('data', (data) => {
            reporter.write(data.toString());
        });
        child.once('exit', (code) => {
            exitCode += code;
            cb();
        });
        child.stdout.on('end', () => {});
        child.stderr.pipe(process.stderr);
        child.once('error', err => ipcSend({ name: 'error', body: err }));
    }, () => {
        reporter.end();
        callback(null, exitCode ? 1 : 0);
    });
}

debug('START', `reporter: ${argv.reporter}`);
debug('IS MASTER', isMaster);
debug('IGNORE PATH', config.ignorePath);
debug('FILTER PATH', argsPaths);

ipcSend({ name: 'start', body: argv });

if (isMaster) {
    const testFiles = getTestFiles();
    verbose(`TEST FILES: ${testFiles.length}`, testFiles.map(f => `  ${f}\n`).join(''));
}

if ((argv.coverage || argv.watch) && isMaster) {
    ipcSend({ name: 'run master' });
    const args = ['node', __filename].concat(process.argv.slice(2), '--child');
    if (argv.coverage) {
        const reporters = [];
        if (castArray(argv.coverage).includes('console')) {
            reporters.push('text', 'text-summary');
        }
        if (isArray(argv.coverage)) {
            reporters.push(...without(argv.coverage, 'console'));
        } else if (argv.coverage !== 'console') {
            reporters.push(argv.coverage);
        }
        if (argv.watch) {
            reporters.push('json-summary');
        }
        uniq(reporters).reverse().forEach(reporter => args.unshift(`--reporter=${reporter}`));
    } else if (argv.watch) {
        args.unshift('--reporter=json-summary');
    }

    if (argv.coverageDir) {
        args.unshift(`--report-dir=${argv.coverageDir}`);
    }

    ipcSend({ name: 'run nyc', body: args });

    args.unshift('--exclude=.iamtest.js');
    args.unshift(`--exclude=${path.relative(process.cwd(), config.rootPath)}/**`);

    verbose(`EXEC: ${config.nycPath}`, args.map(v => `  ${v}\n`).join(''));

    const test = fork(config.nycPath, args, { stdio: 'inherit' });
    test.on('exit', (code) => {
        if (argv.web && castArray(argv.coverage).includes('html')) {
            serveCoverageHtml(argv.web);
        }
        if (argv.watch) {
            runWatcher(args);
        }
        if (!argv.web && !argv.watch) {
            process.exit(code);
        }
    });
    // bubble child message
    test.on('message', (message) => {
        ipcSend(message);
    });
    test.on('error', err => ipcSend({ name: 'error', body: err }));
} else {
    debug('RUN TESTS');
    ipcSend({ name: 'run test' });
    runTest((err, code) => {
        debug('FINISH TESTS', `code=${code}`);
        if (code) {
            process.nextTick(() => {
                process.exit(code);
            });
        }
    });
}
