/**
 * unpatched version
 */

const chalk = require('chalk');
const { colors } = require('./argument_parser')();

let i = 0;

exports.logger = (value) => {
    let colorsLength = colors.length;

    if (i === colorsLength) {
        i = 0;
    }
    let fn = chalk[colors[i]];

    console.log(fn(value));

    i++;
};