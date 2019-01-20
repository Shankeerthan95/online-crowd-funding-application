const fs = require('fs');
const path = require('path');

module.exports = (configPath) => {
    const config = {
        rootPath: 'test',
        ignorePath: [],
        nycPath: require.resolve('nyc/bin/nyc.js'),
        babelNodeBinPath: require.resolve('babel-cli/bin/babel-node.js'),
        flowNodeBinPath: require.resolve('flow-remove-types/flow-node'),
    };

    if (fs.existsSync(configPath)) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        Object.assign(config, require(configPath));
    }

    if (!config.rootPath) {
        config.rootPath = process.cwd();
    }
    if (!path.isAbsolute(config.rootPath)) {
        config.rootPath = path.resolve(process.cwd(), config.rootPath);
    }
    config.ignorePath = config.ignorePath.map(p => path.resolve(process.cwd(), p));
    return config;
};
