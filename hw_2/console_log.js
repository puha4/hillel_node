const chalk = require('chalk');

const { colors } = require('./argument_parser')();

const log = console.log;
let i = 0;

console.log = (value) => {

    let colorsLength = colors.length;

    if (i === colorsLength) {
        i = 0;
    }
    let fn = chalk[colors[i]];

    log(fn(value));

    i++;
};