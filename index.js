const functionList = require('./function.js')
const db = require('./db.js')

module.exports.add = async (title) => {
    const list = await db.read()
    list.push({title, done: false})
    await db.write(list)
}

module.exports.clear = async () => {
    await db.write([])
}

module.exports.showAll = async () => {
    const list = await db.read()
    functionList.printTasks(list)

}