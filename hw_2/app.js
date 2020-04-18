const Finder = require('./Finder');
const { deep, path } = require('./argument_parser')();
const extensions = require('./extension_parser')(process.env);
require('./global_functions');
require('./console_log');

const dirPath = preparePath(path);

const finder = new Finder(dirPath, extensions, deep, 'test');

finder.on('started', () => {
    finder.parse();
});

finder.on('file', data => {
    console.log(`file ${data}`);
});

finder.on('processing', data => {
    console.log(`processing ${JSON.stringify(data)}`);
});

finder.on('finished', () => {
    console.log('finished');
});