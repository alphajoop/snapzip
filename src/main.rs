use std::env;
use std::path::Path;

use colored::*;
use snapzip::{compress_jpeg, compress_png};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 || args.len() > 3 {
        eprintln!("{}", "❌ Usage: snapzip <input_image> [output_image]".red());
        std::process::exit(1);
    }

    let input = &args[1];

    // Génération automatique du nom de sortie si non fourni
    let output = if args.len() == 3 {
        args[2].clone()
    } else {
        let path = Path::new(input);
        let stem = path.file_stem().unwrap_or_default().to_string_lossy();
        let ext = path.extension().unwrap_or_default().to_string_lossy();
        format!("{}_compressed.{}", stem, ext)
    };

    let ext = Path::new(input)
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("")
        .to_lowercase();

    println!("{}", "🔧 Compressing image...".yellow());

    let result = match ext.as_str() {
        "png" => compress_png(input, &output),
        "jpg" | "jpeg" => compress_jpeg(input, &output),
        _ => {
            eprintln!(
                "{}",
                "❌ Unsupported file type. Use .png or .jpg/.jpeg".red()
            );
            std::process::exit(1);
        }
    };

    match result {
        Ok((before, after, duration)) => {
            let saved = before.saturating_sub(after);
            let percent = if before == 0 {
                0.0
            } else {
                (saved as f64 / before as f64) * 100.0
            };

            println!("{}", "✅ Compression completed successfully!".green());
            println!(
                "📦 Size before: {} KB\n📉 Size after:  {} KB\n💾 Saved:       {:.2}%\n⏱ Time:        {:.2} seconds",
                before / 1024,
                after / 1024,
                percent,
                duration
            );
            println!("📁 Output file: {}", output.cyan());
        }
        Err(e) => {
            eprintln!("{} {}", "❌ Compression error:".red(), e);
            std::process::exit(1);
        }
    }
}
