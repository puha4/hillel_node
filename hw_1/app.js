
const { deep, path } = require('./argument_parser')();
const { parsePath } = require('./file_parser');
const extensions = require('./extension_parser')(process.env);
require('./console_log');
require('./global_functions');

const dirPath = preparePath(path);

parsePath(dirPath, extensions, deep).then((items) => {
    items.forEach(item => {
        console.log(item);
    });
});

