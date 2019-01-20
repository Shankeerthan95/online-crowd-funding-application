const _ = require('lodash');
const fs = require('fs');
const EventEmitter = require('events');

class Watcher extends EventEmitter {
    constructor({ verbose }) {
        super();
        this.verbose = verbose;
        this.debounceWait = 400;
        this.files = [];
        this.watchers = [];
        this.await = false;
        this.onChange = _.debounce(() => this.emit('debounce'), this.debounceWait);
    }

    watch(files) {
        if (!files.length) return this.unwatch();
        if (!_.difference(files, this.files).length) return this;
        this.files = _.clone(files);
        this.verbose('UPDATE WATCHERS', this.files.map(f => `  ${f}\n`).join(''));

        this.unwatch();
        this.watchers = _.map(this.files, file => fs.watch(file, () => {
            this.verbose('FILE CHANGED', `${file}\n`);
            this.emit('change');
            this._progressbar();
            this.onChange();
        }));
        return this;
    }

    unwatch() {
        while (this.watchers.length) {
            this.watchers.pop().close();
        }
        return this;
    }

    _progressbar() {
        if (!this.await) {
            let timerId;
            this.await = true;
            this.once('debounce', () => {
                this.await = false;
                clearInterval(timerId);
                process.stdout.write('\n\n');
            });
            process.stdout.write('\n  .');
            timerId = setInterval(() => {
                process.stdout.write('.');
            }, 100);
        }
    }
}

module.exports = Watcher;
