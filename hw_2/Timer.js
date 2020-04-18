

class Timer {
    constructor(fn,  time) {
        this.fn = fn;
        this.time = time;
        this.interval = setInterval(fn, time);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;

        return this;
    }

    start() {
        if (!this.interval) {
            this.stop();
            this.interval = setInterval(this.fn, this.time)
        }

        return this;
    }

    reset() {
        return this.stop().start();
    }
}

module.exports = Timer;