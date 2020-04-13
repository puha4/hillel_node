
const DEFAULT_EXTENSIONS = [];

module.exports = input => {
    const { EXT } = input;

    return  EXT ? JSON.parse(EXT) : DEFAULT_EXTENSIONS;
}