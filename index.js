const url = process.argv[2]; // https://proof.ovh.net/files/100Mb.dat

if (!url) {
    console.error('Используйте: node index.js <url>')
    process.exit(1);
}

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

const result = await downloadOnce(url);
console.log(`Скачано ${(result.bytes / 1024 / 1024).toFixed(2)} МБ за ${result.ms.toFixed(0)} мс`);