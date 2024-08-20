import fs from "node:fs";

function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, "base64");
}
function saveBufferToFile(fileName: string, buffer: Buffer) {
  fs.writeFileSync(fileName, buffer);
}
export function saveFileFromBase64(fileName: string, base64: string) {
  var base64Data = base64.replace(/^data:.*;base64,/, '');
  const buffer = base64ToBuffer(base64Data);
  saveBufferToFile(fileName, buffer);
}