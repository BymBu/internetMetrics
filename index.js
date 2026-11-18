const url = process.argv[2]; // https://proof.ovh.net/files/100Mb.dat

if (!url) {
    console.error('Используйте: node index.js <url>')
    process.exit(1);
}

const REQUESTS = 10
let totalBytes = 0
let totalMs = 0

const res = await fetch(url)
const buf = await res.arrayBuffer()
console.log(buf.byteLength); 