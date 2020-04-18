const EventEmitter = require('events');
const { readdir, lstat } = require('fs').promises;
const { join, extname } = require('path');
const Timer = require('./Timer');

class Finder extends EventEmitter {

    constructor(searchDir, extensions , deep = 0, excludedSubstring = '') {
        super();

        this.path = searchDir;
        this.allowedExtensions = extensions;
        this.maxDepth = deep;
        this.excludedSubstring = excludedSubstring;
        this.currentDepth = 0;
        this.dirParsedCount = 0;
        this.filesParsedCount = 0;

        setTimeout(() => {
            this.emit('started')
        }, 0);
    }

    async parse() {
        let _this = this;

        let timer = new Timer(function() {
            _this.emit('processing', {
                "dirParsedCount" : _this.dirParsedCount,
                "filesParsedCount" : _this.filesParsedCount
            });
        }, 2000);

        this.on('file', () => {
            timer.reset();
        });

        await this.parseDir();

        setTimeout(() => {
            timer.stop();
            this.emit('finished')
        }, 0);
    }

    async parseDir(recursionPath) {
        if (this.maxDepth > 0 && this.currentDepth >= this.maxDepth) {
            return;
        }
        this.dirParsedCount++;
        let path = recursionPath || this.path;

        let files = await readdir(path);

        for (const file of files) {
            let filePath = join(path, file);
            let stat = await lstat(filePath);

            if (stat.isDirectory()) {
                this.currentDepth++;
                await this.parseDir(filePath);
            } else {
                let fileExtension = extname(file);

                if (this.allowedExtensions.includes(fileExtension)) {
                    if (this.excludedSubstring && file.includes(this.excludedSubstring)) {
                        continue;
                    }
                    this.filesParsedCount++;
                    setTimeout(() => {
                        this.emit('file', filePath)
                    }, 0);
                }
            }
        }
    }
}

module.exports = Finder;