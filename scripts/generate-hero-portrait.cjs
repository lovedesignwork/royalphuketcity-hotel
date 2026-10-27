// Keep the original photograph intact. This lossless derivative contains only
// pixels already visible through object-cover on portrait phone viewports.
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const source = path.resolve("public/images/HOTEL WEBSITE/RPC-Main-Image.jpg");
  const output = path.resolve("public/images/hero/rpc-main-portrait.png");
  const { width, height } = await sharp(source).metadata();
  // Round upward and preserve parity so the crop remains exactly centered.
  let cropWidth = Math.ceil(height * 3 / 4);
  if ((width - cropWidth) % 2) cropWidth += 1;
  const left = (width - cropWidth) / 2;
  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp(source).extract({ left, top: 0, width: cropWidth, height })
    .png({ compressionLevel: 9 }).toFile(output);
  console.log(JSON.stringify({ source, output, width, height, cropWidth, left }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
