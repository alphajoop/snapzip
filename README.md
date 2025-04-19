# 📸 Snapzip

<div align="center">

![Snapzip Logo](https://via.placeholder.com/200x200.png?text=snapzip)

**A lightning-fast image compression tool for JPEG and PNG files**

[![npm version](https://img.shields.io/npm/v/snapzip.svg)](https://www.npmjs.com/package/snapzip)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/alphajoop/snapzip/ci-publish.yml?branch=main)](https://github.com/alphajoop/snapzip/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## ✨ Features

- 🚀 **High Performance**: Built with Rust for optimal speed and efficiency
- 🔄 **Cross-Platform**: Works on Windows, macOS (Intel & Apple Silicon), and Linux
- 📦 **Easy Installation**: Available as an npm package - no Rust required!
- 📊 **Detailed Stats**: Get compression statistics including size reduction and time
- 🛠️ **Simple CLI**: Intuitive command-line interface

## 📥 Installation

```bash
# Install globally
npm install -g snapzip

# Or use with npx
npx snapzip image.jpg compressed.jpg
```

## 🚀 Usage

### Compressing a JPEG image

```bash
snapzip image.jpg compressed.jpg
```

### Compressing a PNG image

```bash
snapzip image.png compressed.png
```

### Example output

```
🔧 Compressing image...
✅ Compression completed successfully!
📦 Size before: 1024 KB
📉 Size after:  512 KB
💾 Saved:       50.00%
⏱ Time:        0.25 seconds
```

## 🧰 How It Works

Snapzip combines the power of Rust with the convenience of npm:

1. **Core Engine**: Written in Rust for maximum performance
2. **npm Wrapper**: JavaScript wrapper that makes it easy to use from Node.js
3. **Multi-Platform**: Precompiled binaries for all major platforms

Under the hood, Snapzip uses:

- **mozjpeg**: An optimized JPEG implementation for JPEG compression
- **oxipng**: A fast and efficient PNG optimizer for PNG compression

## 🏗️ Project Structure

```
snapzip/
├── src/                 # Rust source code
├── Cargo.toml           # Rust dependencies
├── pkg/                 # npm package
│   ├── src/             # TypeScript source
│   ├── lib/             # Compiled JavaScript
│   ├── bin/             # Precompiled binaries
│   └── package.json     # npm package configuration
└── .github/workflows/   # CI/CD pipelines
```

## 🔧 Development

### Prerequisites

- **Rust**: 2024 edition or newer
- **Node.js**: v12.0.0 or higher
- **pnpm**: For package management

### Building from source

1. Clone the repository

   ```bash
   git clone https://github.com/alphajoop/snapzip.git
   cd snapzip
   ```

2. Build the Rust project

   ```bash
   cargo build --release
   ```

3. Set up the npm package

   ```bash
   cd pkg
   pnpm install
   pnpm build
   ```

4. Link the binary for local testing
   ```bash
   mkdir -p bin
   # For Windows
   cp ../target/release/snapzip.exe bin/snapzip-win32-x64.exe
   # For macOS
   # cp ../target/release/snapzip bin/snapzip-darwin-x64
   # For Linux
   # cp ../target/release/snapzip bin/snapzip-linux-x64
   ```

## 🚢 Publishing

This project uses GitHub Actions to automatically:

1. Build binaries for all supported platforms
2. Run tests
3. Publish to npm

To publish a new version:

```bash
# Update version in pkg/package.json
git add .
git commit -m "feat: your changes description"
git tag v0.2.1  # Use the correct version
git push && git push --tags
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

[Alpha DIOP](https://github.com/alphajoop)
