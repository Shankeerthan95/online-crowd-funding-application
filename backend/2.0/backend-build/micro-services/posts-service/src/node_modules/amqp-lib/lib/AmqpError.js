class AmqpError extends Error {
    constructor(err) {
        super();
        this.code = err.code;
        this.address = err.address;
        this.port = err.port;
        this.message = err.message;
        if (err && err.code === 'ENOTFOUND') this.message = `Host ${err.hostname} not found`;
        if (err && err.code === 'ECONNREFUSED') this.message = `${err.address}:${err.port} connection refused`;
    }
}

module.exports = AmqpError;
