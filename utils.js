const fs = require('fs/promises')


async function readData(filename, isObject = false) {
    try {
        const data = fs.readFile(filename, 'utf-8')
        return isObject ? JSON.parse(data) : data

    } catch(er) {
        console.log(er)
    }
}

async function writeData(filename, data) {
    try {
        await fs.writeFile(filename, JSON.stringify(data))
        console.log({message: 'successe'})
    } catch(er) {
        console.log(er)
    }
}

module.exports = { readData, writeData };