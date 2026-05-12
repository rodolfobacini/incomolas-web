#!/usr/bin/env node
/**
 * Normaliza em lote todas as fotos em `portfolio/fotos-novas/` e grava o
 * resultado em `public/products/` com o mesmo nome (extensão trocada pra .png).
 *
 * Aceita .jpg, .jpeg, .png, .webp. Ignora arquivos que começam com ponto.
 *
 *   node scripts/batch-normalize-photos.mjs
 */

import { readdirSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const INPUT_DIR = path.join(ROOT, "portfolio", "fotos-novas");
const OUTPUT_DIR = path.join(ROOT, "public", "products");
const SCRIPT = path.join(import.meta.dirname, "normalize-product-photo.mjs");

const ACCEPTED = /\.(jpe?g|png|webp)$/i;

const files = readdirSync(INPUT_DIR).filter((f) => !f.startsWith(".") && ACCEPTED.test(f));
if (files.length === 0) {
  console.log(`Nenhuma foto encontrada em ${INPUT_DIR}`);
  process.exit(0);
}

let ok = 0;
for (const file of files) {
  const inPath = path.join(INPUT_DIR, file);
  const outName = file.replace(ACCEPTED, ".png").toLowerCase();
  const outPath = path.join(OUTPUT_DIR, outName);
  const res = spawnSync("node", [SCRIPT, inPath, outPath], { stdio: "inherit" });
  if (res.status === 0) ok++;
}
console.log(`\n${ok}/${files.length} foto(s) normalizada(s) em public/products/`);
