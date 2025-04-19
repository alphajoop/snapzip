import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "../tests/sample.jpg");
const outputPath = path.join(__dirname, "../tests/sample_compressed.jpg");

describe("snapzip CLI", () => {
  it("should compress a JPG image and create a new file", () => {
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    const command = `node ./lib/index.js "${inputPath}" "${outputPath}"`;
    execSync(command);

    const exists = fs.existsSync(outputPath);
    expect(exists).toBe(true);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;

    expect(newSize).toBeLessThan(originalSize);
  });
});
