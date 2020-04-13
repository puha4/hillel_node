const { readdir, lstat } = require('fs').promises;
const { join, extname } = require('path');

const parsePath = async (path, allowedExtensions, maxDepth = 0, currentDepth = 0, result = []) => {

    if (maxDepth > 0 && currentDepth >= maxDepth) {
        return;
    }

    let files = await readdir(path);

    for (const file of files) {
        let stat = await lstat(join(path, file));

        if (stat.isDirectory()) {
            await parsePath(join(path, file), allowedExtensions, maxDepth, ++currentDepth, result);
        } else {
            let fileExtension = extname(file);

            if (allowedExtensions.includes(fileExtension)) {
                result.push(file);
            }
        }
    }

    return result;
};


module.exports = {
    parsePath
};