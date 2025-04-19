#!/usr/bin/env node
"use strict";
// Utiliser require au lieu d'import pour éviter les problèmes de types
const path = require('path');
const childProcess = require('child_process');
const fs = require('fs');
// Déterminer le nom du binaire en fonction de la plateforme
const getBinaryName = () => {
    const platform = process.platform;
    const arch = process.arch;
    if (platform === "win32") {
        return `snapzip-${platform}-${arch}.exe`;
    }
    else {
        return `snapzip-${platform}-${arch}`;
    }
};
// Chemin vers le binaire précompilé
const binaryPath = path.join(__dirname, "../bin", getBinaryName());
// Vérifier si le binaire existe
if (!fs.existsSync(binaryPath)) {
    console.error(`Erreur: Binaire non trouvé pour votre plateforme (${process.platform}-${process.arch})`);
    console.error(`Chemin recherché: ${binaryPath}`);
    process.exit(1);
}
const args = process.argv.slice(2);
const result = childProcess.spawnSync(binaryPath, args, { stdio: "inherit" });
process.exit(result.status ?? 1);
