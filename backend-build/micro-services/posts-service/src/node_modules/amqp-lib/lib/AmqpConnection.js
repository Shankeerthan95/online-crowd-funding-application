const amqp = require('amqplib/callback_api');
const url = require('url');
const once = require('lodash.once');
const AmqpError = require('./AmqpError');
const EventEmitter = require('events');

const { assign } = Object;

function amqpUrl(settings, options) {
    const { user, password, host, vhost } = settings;
    return url.format({
        protocol: 'amqp',
        slashes: true,
        auth: user && password ? `${user}:${password}` : '',
        host,
        pathname: vhost,
        query: { heartbeat: options.heartbeat },
    });
}

function defaultSettings(settings) {
    return assign({
        user: process.env.AMQP_LOGIN || '',
        password: process.env.AMQP_PASSWORD || '',
        host: process.env.AMQP_HOST || 'localhost',
        vhost: process.env.AMQP_VHOST || '',
    }, settings || {});
}

function defaultOptions(options) {
    return assign({
        retryOnError: false,
        heartbeat: 30,
        logger: console,
        timeout: [100, 200, 500, 1000, 2000, 4000, 8000, 16000, 32000],
    }, options || {});
}

class AmqpConnection extends EventEmitter {
    constructor(settings, options) {
        super();
        this.settings = defaultSettings(settings);
        this.options = defaultOptions(options);
        this._logger = this.options.logger;

        this._connected = false;
        this._connecting = false;
        this._exiting = false;
        this._reconnectCounter = 0;

        this.close = this.close.bind(this);

        process.once('SIGINT', this.close);
        this.on('error', () => {});

        // eslint-disable-next-line
        this.connection;
    }

    get connection() {
        if (this._connected || this._connecting) {
            return this._connection;
        }
        this._connecting = true;
        this._connection = new Promise((resolve) => {
            this._connect((err, connection) => {
                if (err) return;
                this._connecting = false;
                this._connected = true;
                connection.once('error', (err) => {
                    const error = new AmqpError(err);
                    this.emit('error', error);
                    this._logger.error('[AMQP] error', error.message);
                });
                connection.once('close', () => {
                    this._connected = false;
                    this._logger.info('[AMQP] disconnected');
                    if (!this._exiting) {
                        // eslint-disable-next-line
                        this.connection;
                    }
                    connection.removeAllListeners();
                });
                this._logger.info('[AMQP] connected');
                resolve(connection);
            });
        });
        return this._connection;
    }

    _connect(callback) {
        amqp.connect(amqpUrl(this.settings, this.options), once((err, connection) => {
            if (err) {
                if (this._exiting) return callback(err);
                const error = new AmqpError(err);
                this.emit('error', error);
                this._logger.info('[AMQP] error', new AmqpError(err).message);

                this._reconnectCounter++;
                this._reconnectTimeout(() => {
                    this._connect(callback);
                });
            } else {
                this._reconnectCounter = 0;
                callback(null, connection);
            }
        }));
    }

    _reconnectTimeout(callback) {
        const intervals = this.options.timeout;
        const index = this._reconnectCounter - 1;
        const timeout = intervals[index < intervals.length ? index : intervals.length - 1];
        this._logger.info(`[AMQP] reconnect in ${timeout}ms`);
        setTimeout(callback, timeout);
    }

    close() {
        this._exiting = true;
        if (this._connection) {
            this._connection.then((connection) => {
                connection.close();
            });
        }
    }
}

module.exports = AmqpConnection;
