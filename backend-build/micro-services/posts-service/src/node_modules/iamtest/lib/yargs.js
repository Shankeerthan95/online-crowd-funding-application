const _ = require('lodash');
const yargs = require('yargs');

module.exports = () => yargs
    .options({
        r: {
            alias: 'reporter',
            choices: ['dots', 'spec', 'summary', 'tape', 'silent'],
            describe: 'test reporter',
            default: 'dots',
        },
        c: {
            alias: 'coverage',
            choices: ['console', 'html', 'json', 'json-summary', 'lcov', 'lcovonly',
                'text', 'text-lcov', 'text-summary'],
            describe: 'coverage reporter',
        },
        web: {
            describe: 'web server for coverage report',
            type: 'number',
            nargs: 1,
        },
        w: {
            alias: 'watch',
            describe: 'watch for changes',
            boolean: true,
        },
        child: {
            describe: 'child process',
            boolean: true,
        },
        verbose: {
            describe: 'debug log',
            boolean: true,
        },
        h: { alias: 'help' },
        coverageDir: {
            describe: 'see nyc --report-dir',
            type: 'string',
            nargs: 1,
        },
        babel: {
            describe: 'babel',
            boolean: true,
        },
        flow: {
            describe: 'flow remove types',
            boolean: true,
        },
    })
    .implies('web', 'coverage')
    .check((a) => {
        if (a.web && !_.castArray(a.coverage).includes('html')) {
            throw new Error('Implications failed:\n web -> coverage html');
        }
        return true;
    })
    .epilogue('For more information see https://github.com/amokrushin/stream-zip')
    .help()
    .argv;
