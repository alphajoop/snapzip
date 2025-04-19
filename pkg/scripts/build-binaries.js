#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Obtenir la plateforme et l'architecture actuelles
const platform = process.platform;
const arch = process.arch;

// Chemin du projet Rust (parent du dossier pkg)
const rustProjectPath = path.join(__dirname, "../../");
const binDir = path.join(__dirname, "../bin");

console.log(
  `Préparation du binaire pour les tests locaux (${platform}-${arch})...`
);

try {
  // Vérifier si le binaire existe déjà dans target/release
  const srcBinaryName = platform === "win32" ? "snapzip.exe" : "snapzip";
  const destBinaryName =
    platform === "win32"
      ? `snapzip-${platform}-${arch}.exe`
      : `snapzip-${platform}-${arch}`;

  // Chemins complets
  const srcBinaryPath = path.join(
    rustProjectPath,
    "target",
    "release",
    srcBinaryName
  );
  const destBinaryPath = path.join(binDir, destBinaryName);

  // Vérifier si le binaire source existe, sinon le compiler
  if (!fs.existsSync(srcBinaryPath)) {
    console.log("Binaire non trouvé, compilation en cours...");
    console.log("Exécution de cargo build --release...");
    execSync("cargo build --release", {
      cwd: rustProjectPath,
      stdio: "inherit",
    });
  } else {
    console.log(`Binaire trouvé à ${srcBinaryPath}`);
  }

  // Vérifier à nouveau que le binaire source existe
  if (!fs.existsSync(srcBinaryPath)) {
    throw new Error(
      `Le binaire compilé n'a pas été trouvé à l'emplacement attendu: ${srcBinaryPath}`
    );
  }

  // Copier le binaire compilé vers le dossier bin
  console.log(`Copie du binaire de ${srcBinaryPath} vers ${destBinaryPath}...`);
  fs.copyFileSync(srcBinaryPath, destBinaryPath);

  // Rendre le binaire exécutable sur les systèmes Unix
  if (platform !== "win32") {
    console.log("Attribution des permissions d'exécution...");
    fs.chmodSync(destBinaryPath, "755");
  }

  console.log(
    `Binaire préparé avec succès pour les tests locaux: ${destBinaryName}`
  );
  console.log(
    "Pour les tests en production, utilisez GitHub Actions pour compiler les binaires pour toutes les plateformes."
  );
} catch (error) {
  console.error("Erreur lors de la préparation du binaire:");
  console.error(error);
  process.exit(1);
}
