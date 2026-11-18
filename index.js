const url = process.argv[2];

if (!url) {
  console.error('Используйте: node index.js <url>');
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

async function main() {
  let totalBytes = 0;
  let totalMs = 0;

  for (let i = 0; i < REQUESTS; i++) {
    const { bytes, ms } = await downloadOnce(url);
    totalBytes += bytes;
    totalMs += ms;
    console.log(`Запрос ${i + 1}/${REQUESTS}: ${ms.toFixed(0)} мс, ${(bytes / 1024 / 1024).toFixed(2)} МБ`);
  }

  const avgMs = totalMs / REQUESTS;
  const totalSeconds = totalMs / 1000;
  const avgMbPerSec = (totalBytes / (1024 * 1024)) / totalSeconds;

  console.log('---');
  console.log(`Всего запросов:        ${REQUESTS}`);
  console.log(`Среднее время ответа:  ${avgMs.toFixed(2)} мс`);
  console.log(`Скачано:               ${(totalBytes / 1024 / 1024).toFixed(2)} МБ`);
  console.log(`Затрачено времени:     ${totalSeconds.toFixed(2)} с`);
  console.log(`Скорость загрузки:     ${avgMbPerSec.toFixed(2)} МБ/с`);
}

main().catch((err) => {
  console.error('Ошибка:', err.message);
  process.exit(1);
});