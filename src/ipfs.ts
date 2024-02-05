import axios from 'axios'
import { AddFileResponse, DhtStatsParams, DhtStatsResponseItem, Options } from './types'
import { AddFileParams, GetFileParams } from './types'
import { buildUrlWithParams, parseNdjson } from './util'

export class IPFSHTTPClient {
    options: Options

    constructor(options?: Options) {
        this.options = {
            protocol: options?.protocol || 'http',
            host: options?.host || '127.0.0.1',
            port: options?.port || 5001,
        }
    }

    makeUrl(path: string) {
        return `${this.options.protocol}://${this.options.host}:${this.options.port}${path}`
    }

    async add(file: Blob | string, params?: AddFileParams): Promise<AddFileResponse> {
        const url = this.makeUrl('/api/v0/add')
        const formData = new FormData()
        formData.append('file', file)

        const fullUrl = buildUrlWithParams(url, params)

        try {
            const response = await axios.post(fullUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status > 201) {
                throw new Error(`Failed to upload file: ${response.statusText}`)
            }
            return response.data as AddFileResponse
        } catch (error) {
            throw error
        }
    }

    async get(params: GetFileParams) {
        const url = this.makeUrl('/api/v0/get')
        const fullUrl = buildUrlWithParams(url, params)

        const response = await axios.post(fullUrl)

        if (response.status > 201) {
            throw new Error(`Failed to download file: ${response.statusText}`)
        }
        return response.data
    }

    async cat(params: GetFileParams) {
        const url = this.makeUrl('/api/v0/cat')
        const fullUrl = buildUrlWithParams(url, params)

        const response = await axios.post(fullUrl)

        if (response.status > 201) {
            throw new Error(`Failed to download file: ${response.statusText}`)
        }
        return response.data
    }

    async dhtStat(params: DhtStatsParams): Promise<DhtStatsResponseItem[]> {
        const url = this.makeUrl('/api/v0/stats/dht')
        const fullUrl = buildUrlWithParams(url, params)

        const response = await axios.post(fullUrl)
        if (response.status > 201) {
            throw new Error(`Failed to retrieve DHT stats: ${response.statusText}`)
        }
        return parseNdjson(response.data)
    }

    // Not really, huh?
    async isOnline() {
        const res = await this.dhtStat({})
        return res.find((item) => item.Name === 'wan') !== undefined
    }

    /**
     * Return JSON from IPFS URI
     * Use only if you know that you are fetching JSON
     * @param uri ipfs://<hash>
     * @returns
     */
    async jsonFromUri(uri: string) {
        const data = await this.cat({
            arg: uri.replace('ipfs://', ''),
        })
        return data
    }
}
