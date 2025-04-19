#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Chemins des répertoires à créer
const binDir = path.join(__dirname, "../bin");

// Créer le répertoire bin s'il n'existe pas
if (!fs.existsSync(binDir)) {
  console.log("Création du répertoire bin...");
  fs.mkdirSync(binDir, { recursive: true });
} else {
  console.log("Le répertoire bin existe déjà.");
}

console.log("Répertoires vérifiés avec succès.");
