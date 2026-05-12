#!/usr/bin/env node
/**
 * Normaliza uma foto de produto pro padrão visual do site Incomolas.
 *
 *   - 1254x1254 quadrado (mesmo tamanho dos PNGs atuais em /public/products/)
 *   - Fundo preto com gradiente radial sutil (#1a1a1d → #060606)
 *   - Produto centralizado, com ~78% de área útil
 *   - Drop-shadow leve embaixo
 *
 * USO:
 *   node scripts/normalize-product-photo.mjs <entrada.jpg|png> <saida.png>
 *
 * EXEMPLO:
 *   node scripts/normalize-product-photo.mjs portfolio/fotos-novas/baldan-pst.jpg public/products/baldan-pst.png
 *
 * REQUISITOS:
 *   - sharp instalado (pnpm add -D sharp)
 *   - Foto de origem com fundo preto, escuro ou removido (PNG transparente funciona melhor)
 *
 * DICA: pra remover fundo automaticamente em fotos com fundo branco/claro:
 *   https://www.remove.bg/  ou  https://www.photoroom.com/
 *   Salve o PNG transparente e jogue aqui.
 */

import sharp from "sharp";
import path from "node:path";
import { existsSync } from "node:fs";

const SIZE = 1254;
const PADDING = Math.round(SIZE * 0.11); // ~138px → produto ocupa ~78%

async function main() {
  const [, , input, output] = process.argv;
  if (!input || !output) {
    console.error("Uso: node scripts/normalize-product-photo.mjs <entrada> <saida.png>");
    process.exit(1);
  }
  if (!existsSync(input)) {
    console.error(`Arquivo não encontrado: ${input}`);
    process.exit(1);
  }

  // Fundo: gradiente radial preto via SVG (sharp não tem gradient nativo)
  const bgSvg = Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#1a1a1d"/>
          <stop offset="100%" stop-color="#060606"/>
        </radialGradient>
      </defs>
      <rect width="${SIZE}" height="${SIZE}" fill="url(#g)"/>
    </svg>
  `);

  // Redimensiona o produto preservando aspecto, com padding
  const targetSize = SIZE - PADDING * 2;
  const productBuf = await sharp(input)
    .resize(targetSize, targetSize, {
      fit: "inside",
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  const productMeta = await sharp(productBuf).metadata();

  // Compõe sobre o fundo, centralizado
  const composedBuf = await sharp(bgSvg)
    .composite([
      {
        input: productBuf,
        left: Math.round((SIZE - (productMeta.width ?? targetSize)) / 2),
        top: Math.round((SIZE - (productMeta.height ?? targetSize)) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(composedBuf).toFile(output);
  console.log(`✓ ${path.basename(output)} (${SIZE}×${SIZE})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
