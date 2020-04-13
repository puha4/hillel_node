const argv = require('minimist')(process.argv.slice(2));

const DEFAULT_COLORS = ['red', 'green', 'blue'];

module.exports = () => {
    return {
        'colors': argv['colors'] ? JSON.parse(argv['colors']) : DEFAULT_COLORS,
        'path': argv['path'],
        'deep': argv['deep'] || 0,
    }
}