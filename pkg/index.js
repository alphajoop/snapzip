const { Binary } = require("binary-install");
const os = require("os");
const path = require("path");

const getBinaryPath = () => {
  const packageJson = require("./package.json");
  const binPath = path.join(
    __dirname,
    "bin",
    os.type() === "Windows_NT" ? "snapzip.exe" : "snapzip"
  );
  return binPath;
};

const getPlatform = () => {
  const type = os.type();
  const arch = os.arch();

  if (type === "Windows_NT") {
    return arch === "x64" ? "win64" : "win32";
  }

  if (type === "Linux") {
    return arch === "x64" ? "linux" : "linux-arm";
  }

  if (type === "Darwin") {
    return arch === "x64" ? "macos" : "macos-arm";
  }

  throw new Error(`Unsupported platform: ${type} ${arch}`);
};

const getBinaryUrl = () => {
  const platform = getPlatform();
  const version = require("./package.json").version;
  return `https://github.com/alphajoop/snapzip/releases/download/v${version}/snapzip-${platform}.tar.gz`;
};

const getBinaryName = () => {
  return os.type() === "Windows_NT" ? "snapzip.exe" : "snapzip";
};

const run = () => {
  const binaryPath = getBinaryPath();
  const binary = new Binary(binaryPath);
  binary.run();
};

module.exports = {
  run,
  getBinaryUrl,
  getBinaryName,
};
