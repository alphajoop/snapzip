# Snapzip

![Snapzip Logo](https://via.placeholder.com/150x150.png?text=snapzip)

snapzip is a fast and efficient image compression tool for JPEG and PNG files, written in Rust for optimal performance.

[![npm version](https://img.shields.io/npm/v/snapzip.svg)](https://www.npmjs.com/package/snapzip)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Optimized compression for JPEG and PNG images
- Simple command-line interface
- Reports compression statistics (before/after size, percentage saved, execution time)
- High performance thanks to Rust implementation

## Installation

```bash
npm install -g snapzip
```

## Usage

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

## How it works

snapzip uses:

- **mozjpeg** - An optimized JPEG implementation for JPEG image compression
- **oxipng** - A fast and efficient PNG optimizer for PNG image compression

## System requirements

- **Node.js**: v12.0.0 or higher
- **Supported operating systems**: Windows, macOS, Linux (x64)

## Development

### Prerequisites

- Rust (2024 edition or newer)
- Cargo
- Node.js v12.0.0 or higher
- npm

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

3. Install npm dependencies
   ```bash
   cd pkg
   npm install
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Alpha DIOP](https://github.com/alphajoop)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
