// 空的fs模块
const fs = {
    promises: {
        readFile: () => Promise.resolve(new Uint8Array()),
        writeFile: () => Promise.resolve()
    },
    readFileSync: () => new Uint8Array(),
    writeFileSync: () => {},
    existsSync: () => false
};

export default fs;