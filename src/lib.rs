use std::fs::{self, File};
use std::io::Write;
use std::path::Path;
use std::time::Instant;

use image::ImageReader;
use mozjpeg::{ColorSpace, Compress, ScanMode};
use oxipng::{InFile, Options, OutFile, optimize};

pub fn compress_png(input: &str, output: &str) -> Result<(u64, u64, f64), String> {
    let input_path = Path::new(input);
    let output_path = Path::new(output);

    if !input_path.exists() {
        return Err(format!("Input file not found: {}", input));
    }

    let before_size = fs::metadata(input_path)
        .map_err(|e| format!("Failed to read input file metadata: {}", e))?
        .len();

    let start_time = Instant::now();

    // Use oxipng for PNG compression
    let opts = Options::max_compression();
    let infile = InFile::Path(input_path.to_path_buf());
    let outfile = OutFile::Path {
        path: Some(output_path.to_path_buf()),
        preserve_attrs: false,
    };

    optimize(&infile, &outfile, &opts).map_err(|e| format!("PNG compression failed: {}", e))?;

    let duration = start_time.elapsed().as_secs_f64();

    let after_size = fs::metadata(output_path)
        .map_err(|e| format!("Failed to read output file metadata: {}", e))?
        .len();

    Ok((before_size, after_size, duration))
}

pub fn compress_jpeg(input: &str, output: &str) -> Result<(u64, u64, f64), String> {
    let input_path = Path::new(input);
    let output_path = Path::new(output);

    if !input_path.exists() {
        return Err(format!("Input file not found: {}", input));
    }

    let before_size = fs::metadata(input_path)
        .map_err(|e| format!("Failed to read input file metadata: {}", e))?
        .len();

    if output_path.exists() {
        fs::remove_file(output_path)
            .map_err(|e| format!("Failed to overwrite output file: {}", e))?;
    }

    let start_time = Instant::now();

    let img = ImageReader::open(input_path)
        .map_err(|e| format!("Failed to open image: {}", e))?
        .decode()
        .map_err(|e| format!("Failed to decode image: {}", e))?;

    let rgb = img.to_rgb8();
    let (width, height) = rgb.dimensions();

    let mut comp = Compress::new(ColorSpace::JCS_RGB);
    comp.set_size(width as usize, height as usize);
    comp.set_quality(75.0);
    comp.set_scan_optimization_mode(ScanMode::Auto);
    comp.set_progressive_mode();

    // Start compression with a Vec as the output buffer
    let mut comp = comp
        .start_compress(Vec::new())
        .map_err(|e| format!("Start compress failed: {}", e))?;

    // Convert RGB image to raw bytes for mozjpeg
    let rgb_data = rgb.as_raw();

    // Write the scanlines
    comp.write_scanlines(rgb_data)
        .map_err(|e| format!("Failed to write scanlines: {}", e))?;

    // Finish compression and get the buffer
    let jpeg_buf = comp
        .finish()
        .map_err(|e| format!("Failed to finish compression: {}", e))?;

    let mut out_file =
        File::create(output_path).map_err(|e| format!("Failed to create output file: {}", e))?;

    out_file
        .write_all(&jpeg_buf)
        .map_err(|e| format!("Failed to write JPEG: {}", e))?;

    let duration = start_time.elapsed().as_secs_f64();

    let after_size = fs::metadata(output_path)
        .map_err(|e| format!("Failed to read output file metadata: {}", e))?
        .len();

    Ok((before_size, after_size, duration))
}
