const fs = require('fs').promises

import { IPFSHTTPClient } from '../../src/index'

describe('General tests', () => {
    let client: IPFSHTTPClient

    beforeEach(async () => {
        client = new IPFSHTTPClient()
    })

    it('Should appear as online', async () => {
        const isOnline = await client.isOnline()
        expect(isOnline).toBe(true)
    })

    it('Should upload file successfully', async () => {
        const data = await fs.readFile('test.txt')
        const file = Buffer.from(data)

        const res = await client.add(new Blob([file]), {})
        expect(res).toBeDefined()
    })

    it('Should (upload &) download file successfully', async () => {
        const data = await fs.readFile('test.txt')
        const file = Buffer.from(data)

        const uploadRes = await client.add(new Blob([file]), {})
        const downloadRes = await client.cat({ arg: uploadRes.Hash })
        expect(downloadRes).toBe('Hi there')
    })

    it('Should (upload &) download file successfully: JSON', async () => {
        const uploadRes = await client.add(JSON.stringify({ id: 'abc' }))
        const downloadRes = await client.cat({ arg: uploadRes.Hash })
        expect(downloadRes).toStrictEqual({
            id: 'abc',
        })
    })
})
