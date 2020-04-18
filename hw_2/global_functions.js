global.preparePath = path => {
    if (path.includes('~')) {
        path = path.replace('~', process.env['HOME']);
    }

    return path;
};