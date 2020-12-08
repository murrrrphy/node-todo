const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
    afterEach(() => {
        fs.clear()
    })
    it('can read', async () => {
        const data = [{title: 'hi', done: false}]
        fs.setReadFileMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })
    it('can write', async () => {
        let fileMock
        fs.setWriteFileMock('/yyy', (path, data, callback) => {
            fileMock = data
            callback(null)
        })
        const list = [{title: 'aaa', done: true}, {title: 'sss', done: false}]
        await db.write(list, '/yyy')
        expect(fileMock).toBe(JSON.stringify(list) + '\n')
    })
})