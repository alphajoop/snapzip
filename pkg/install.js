const { install } = require("binary-install");
const os = require("os");
const path = require("path");

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

const install = () => {
  const url = getBinaryUrl();
  const name = getBinaryName();

  console.log(`Downloading snapzip binary from ${url}`);

  return install(url, name);
};

install();
