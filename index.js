const url = process.argv[2]; // https://proof.ovh.net/files/100Mb.dat

if (!url) {
    console.error('Используйте: node index.js <url>')
    process.exit(1);
}

const REQUESTS = 10;

async function downloadOnce(targetUrl) {
    const startedAt = performance.now();
    const response = await fetch(targetUrl);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const body = await response.arrayBuffer();
    const elapsedMs = performance.now() - startedAt;

    return {
        bytes: body.byteLength,
        ms: elapsedMs,
    };
}

let totalBytes = 0;
let totalMs = 0;

for (let i = 0; i < REQUESTS; i++) {
    const { bytes, ms } = await downloadOnce(url);
    totalBytes += bytes;
    totalMs += ms;
    console.log(`Запрос ${i + 1}/${REQUESTS}: ${ms.toFixed(0)} мс, ${(bytes / 1024 / 1024).toFixed(2)} МБ`);
}

console.log('---');
console.log(`Скачано: ${(totalBytes / 1024 / 1024).toFixed(2)} МБ`);
console.log(`Затраченное время:       ${(totalMs / 1000).toFixed(2)} s`);