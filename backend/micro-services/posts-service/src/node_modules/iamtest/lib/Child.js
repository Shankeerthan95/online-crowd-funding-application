const _ = require('lodash');
const { fork } = require('child_process');

class Child {
    constructor(file, args, { verbose }) {
        this.id = _.uniqueId();
        this.closed = false;
        this.verbose = verbose;
        if (file) {
            this.verbose('CHILD FORK', `  ${file} ${args.join(' ')}`);
            this.process = fork(file, args, { stdio: 'inherit' });
            this.promise = new Promise(resolve => this.process.once('exit', resolve));
            // this.promise.catch(err => console.error(err));
            this.exit().then(() => {
                this.verbose('CHILD EXIT');
                this.closed = true;
            });
        } else {
            this.promise = Promise.resolve();
            this.closed = true;
        }
    }

    kill() {
        if (!this.closed) {
            this.verbose('\nCHILD KILL');
            this.process.kill('SIGINT');
        }
        return this.exit();
    }

    exit() {
        return this.promise;
    }
}

module.exports = Child;
