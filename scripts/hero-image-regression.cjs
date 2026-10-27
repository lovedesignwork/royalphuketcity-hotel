const test = require("node:test");
const assert = require("node:assert/strict");
const sharp = require("sharp");

const original = "public/images/HOTEL WEBSITE/RPC-Main-Image.jpg";
const portrait = "public/images/hero/rpc-main-portrait.png";

test("portrait asset is a lossless, exactly centered subset of the original photo", async () => {
  const source = await sharp(original).metadata();
  const crop = await sharp(portrait).metadata();
  assert.equal(crop.height, source.height);
  assert.equal(crop.width, 913);
  const left = (source.width - crop.width) / 2;
  assert.equal(left, Math.floor(left));
  const expected = await sharp(original).extract({ left, top: 0,
    width: crop.width, height: crop.height }).raw().toBuffer();
  const actual = await sharp(portrait).raw().toBuffer();
  assert.deepEqual(actual, expected);
});

function visibleRectangle(imageWidth, imageHeight, boxWidth, boxHeight, offset = 0) {
  const scale = Math.max(boxWidth / imageWidth, boxHeight / imageHeight);
  const width = boxWidth / scale;
  const height = boxHeight / scale;
  return [(imageWidth - width) / 2 + offset, (imageHeight - height) / 2, width, height];
}

test("every portrait viewport served the derivative has the identical visible source pixels", () => {
  // Includes very small screens using the existing 500px minimum hero height,
  // tablet/landscape boundaries and wide phone shapes. Nothing wider than
  // the proven range receives a derivative.
  for (let width = 240; width <= 767; width += 1) {
    for (const ratio of [0.25, 0.45, 0.5, 0.6, 0.74999, 0.75]) {
      const height = Math.max(500, width / ratio);
      const source = visibleRectangle(2489, 1217, width, height);
      const crop = visibleRectangle(913, 1217, width, height, 788);
      for (let i = 0; i < source.length; i++) {
        assert.ok(Math.abs(source[i] - crop[i]) < 1e-9,
          `changed crop at ${width}px / ratio ${ratio}`);
      }
    }
  }
});
