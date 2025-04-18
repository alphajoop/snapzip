# Changelog

## [v0.1.1] - 2025-04-18

### Added

- Automatic output filename generation when not provided by the user.
- Better usage feedback for missing or incorrect CLI arguments.

### Changed

- CLI usage now accepts either one or two arguments:
  - `snapzip <input_image>` → generates `<input>_compressed.<ext>`
  - `snapzip <input_image> <output_image>` → uses the given output path

### Fixed

- Removed unused variable warning in `main.rs`.

---

## [v0.1.0] - 2025-04-17

### Initial Release

- Image compression for `.png`, `.jpg`, and `.jpeg` formats
- Displays size before/after compression, saved percentage, and duration
