export interface Options {
    protocol?: string
    host?: string
    port?: number
}

export interface Peer {
    AgentVersion: string
    Connected: boolean
    ID: string
    LastQueriedAt: string
    LastUsefulAt: string
}

export interface Bucket {
    LastRefresh: string
    Peers: Peer[]
}

/**
 * Parameters for the `add` method of the IPFS client.
 *
 * @param arg The path to the IPFS object(s) to be outputted.
 * @param output The path where the output should be stored.
 * @param archive Output a TAR archive.
 * @param compress Compress the output with GZIP compression.
 * @param compressionLevel The level of compression (1-9).
 * @param progress Stream progress data.
 */
export interface GetFileParams {
    arg: string
    output?: string
    archive?: boolean
    compress?: boolean
    compressionLevel?: number
    progress?: boolean
}

/**
 * Parameters for the `add` method of the IPFS client.
 *
 * @param quiet Write minimal output.
 * @param quieter Write only final hash.
 * @param silent Write no output.
 * @param progress Stream progress data.
 * @param trickle Use trickle-dag format for dag generation.
 * @param onlyHash Only chunk and hash - do not write to disk.
 * @param wrapWithDirectory Wrap files with a directory object.
 * @param chunker Chunking algorithm, size-[bytes], rabin-[min]-[avg]-[max] or buzhash.
 * @param rawLeaves Use raw blocks for leaf nodes.
 * @param noCopy Add the file using filestore. Implies rawLeaves. (experimental).
 * @param fsCache Check the filestore for pre-existing blocks. (experimental).
 * @param cidVersion CID version. Defaults to 0 unless an option that depends on CIDv1 is passed. Passing version 1 will cause the rawLeaves option to default to true.
 * @param hash Hash function to use. Implies CIDv1 if not sha2-256. (experimental).
 * @param inline Inline small blocks into CIDs. (experimental).
 * @param inlineLimit Maximum block size to inline. (experimental).
 * @param pin Pin locally to protect added files from garbage collection.
 * @param toFiles Add reference to Files API (MFS) at the provided path.
 */
export interface AddFileParams {
    quiet?: boolean
    quieter?: boolean
    silent?: boolean
    progress?: boolean
    trickle?: boolean
    onlyHash?: boolean
    wrapWithDirectory?: boolean
    chunker?: string
    rawLeaves?: boolean
    noCopy?: boolean
    fsCache?: boolean
    cidVersion?: number
    hash?: string
    inline?: boolean
    inlineLimit?: number
    pin?: boolean
    toFiles?: string
}

export interface AddFileResponse {
    Name: string
    Hash: string
    Size: number
}

export interface DhtStatsParams {
    sizeOnly?: boolean
    human?: boolean
}

export interface DhtStatsResponseItem {
    Name: string
    Buckets: Bucket[]
}
