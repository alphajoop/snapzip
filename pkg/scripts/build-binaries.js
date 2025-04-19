#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Obtenir la plateforme et l'architecture actuelles
const platform = process.platform;
const arch = process.arch;

// Chemin du projet Rust (parent du dossier pkg)
const rustProjectPath = path.join(__dirname, '../../');
const binDir = path.join(__dirname, '../bin');

console.log(`Compilation du binaire pour ${platform}-${arch}...`);

try {
  // Compiler le projet Rust en mode release
  console.log('Exécution de cargo build --release...');
  execSync('cargo build --release', { 
    cwd: rustProjectPath,
    stdio: 'inherit'
  });

  // Déterminer le nom du binaire source et destination
  const srcBinaryName = platform === 'win32' ? 'snapzip.exe' : 'snapzip';
  const destBinaryName = platform === 'win32' 
    ? `snapzip-${platform}-${arch}.exe` 
    : `snapzip-${platform}-${arch}`;

  // Chemins complets
  const srcBinaryPath = path.join(rustProjectPath, 'target', 'release', srcBinaryName);
  const destBinaryPath = path.join(binDir, destBinaryName);

  // Vérifier que le binaire source existe
  if (!fs.existsSync(srcBinaryPath)) {
    throw new Error(`Le binaire compilé n'a pas été trouvé à l'emplacement attendu: ${srcBinaryPath}`);
  }

  // Copier le binaire compilé vers le dossier bin
  console.log(`Copie du binaire de ${srcBinaryPath} vers ${destBinaryPath}...`);
  fs.copyFileSync(srcBinaryPath, destBinaryPath);

  // Rendre le binaire exécutable sur les systèmes Unix
  if (platform !== 'win32') {
    console.log('Attribution des permissions d\'exécution...');
    fs.chmodSync(destBinaryPath, '755');
  }

  console.log(`Binaire compilé et copié avec succès: ${destBinaryName}`);
} catch (error) {
  console.error('Erreur lors de la compilation ou de la copie du binaire:');
  console.error(error);
  process.exit(1);
}
