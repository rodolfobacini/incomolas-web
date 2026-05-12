# Fotos novas → padrão do catálogo

Esta pasta é o **input** do pipeline de fotos de produto. Qualquer JPG/PNG/WEBP
jogado aqui pode ser convertido para o padrão visual do site (1254×1254 com
fundo preto gradiente) e gravado direto em `public/products/`.

## Como fazer

### 1. Tire (ou recolha) a foto

- Produto sobre superfície escura (papelão preto, cartolina, EVA preto…)
- Luz lateral suave (sol indireto ou janela)
- Foco no produto, sem cortes
- Se a foto tiver fundo claro, passe em [remove.bg](https://www.remove.bg/)
  primeiro pra deixar fundo transparente — o resultado fica mais limpo.

### 2. Renomeie com o slug do produto

O nome do arquivo vira o nome final em `public/products/`. Use o **slug** do
produto em `lib/products.ts`. Exemplos:

| Arquivo aqui                | Vira                                 | Slug do produto                |
|-----------------------------|---------------------------------------|--------------------------------|
| `mola-baldan-plantadeira-pst.jpg` | `public/products/mola-baldan-plantadeira-pst.png` | `mola-baldan-plantadeira-pst` |
| `dobradica-tampa-randon-moderna.png` | `public/products/dobradica-tampa-randon-moderna.png` | `dobradica-tampa-randon-moderna` |

> Para encontrar o slug certo, abre `lib/products.ts` e procura pelo nome do
> produto — o `slug:` é o que vai antes do `.png`.

### 3. Rode o pipeline

Para **uma foto**:

```bash
pnpm fotos:one portfolio/fotos-novas/baldan-pst.jpg public/products/mola-baldan-plantadeira-pst.png
```

Para **todas as fotos da pasta** de uma vez:

```bash
pnpm fotos:normalize
```

Cada arquivo é redimensionado pra 1254×1254, centralizado, aplicado fundo preto
radial, e exportado como PNG em `public/products/`. O nome final usa o do
arquivo de entrada (em minúsculas, com extensão `.png`).

### 4. Atualize o `image:` no produto (se o slug mudou)

Se o nome do arquivo gerado bate com o slug, **não precisa fazer nada** — o
produto já aponta para ele. Se você quiser usar um nome diferente, abra
`lib/products.ts`, ache o produto e troque o campo `image: "/products/…"`.

### 5. Confira no site

```bash
pnpm dev
# abre /produto/<slug>
```

A foto deve aparecer no preview principal e nos quatro thumbnails embaixo,
com o gradiente preto característico.

## Dicas para fotos consistentes

- **Distância**: produto ocupando ~70% do enquadramento original
- **Ângulo**: levemente inclinado (15-30°) dá profundidade nas espirais
- **Sombra**: o script aplica drop-shadow automaticamente — não precisa
- **Cor de aço**: prata/cromo brilha sob luz lateral. Acabamento preto pede luz
  mais difusa pra não virar borrão.
