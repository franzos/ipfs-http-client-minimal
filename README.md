# IPFS HTTP Client

This package provides a minimal IPFS client.

Here's what's supported:
- add
- get
- cat
- stats/dht

In theory it should work both on Node.js and in the browser.

## Installation

```bash
pnpm install ipfs-http-client-minimal
```

## Usage

This module expects a running IPFS daemon.

```bash
ipfs daemon
```

### Use

```js
const isOnline = await client.isOnline()
console.log(isOnline) // true
```

Upload and download:

```js
const up = await client.add(JSON.stringify({ id: 'abc' }))
const down = await client.cat({ arg: up.Hash })
expect(down).toStrictEqual({
    id: 'abc',
})
```

## Test

```bash
pnpm run test
```