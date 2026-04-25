# Incomolas — Site institucional

Site institucional da Incomolas Indústria de Molas. Built com **Next.js 14 (App Router)**, **TypeScript** e **Tailwind CSS**.

O app tem dois modos de operação que você alterna via variável de ambiente:

| Modo | Quando usar | Comportamento |
| --- | --- | --- |
| `catalog` *(default)* | Lançamento institucional / mostruário | Sem carrinho. Preços ocultos, exibe "Consulte". Botão principal vai para `/orcamento`. Rotas `/carrinho` e `/checkout/*` redirecionam para `/orcamento`. |
| `ecommerce` | Quando estiver pronto para vender online | Preços visíveis, carrinho, checkout multi-etapas, fluxo Pix/cartão/boleto/faturado. |

Mudar de modo é uma única env var (`NEXT_PUBLIC_MODE`).

---

## 📁 Estrutura

```
web/
├── app/
│   ├── (rotas)               # Home, /catalogo, /produto/[slug], /carrinho, /checkout/*, /orcamento, /sobre
│   └── api/orcamento         # POST: envia o orçamento por e-mail
├── components/               # UI (Navbar, Footer, ProductCard, QuoteForm, …)
├── lib/                      # Mock data, types, utils, e-mail template
│   ├── products.ts           # ⭐ Produtos do mostruário (mock)
│   ├── categories.ts         # Categorias e suas imagens
│   ├── mode.ts               # IS_CATALOG / IS_ECOMMERCE
│   └── email-template.ts     # HTML + texto do e-mail de orçamento
├── public/products/          # Fotos das molas
├── store/cart.ts             # Carrinho (zustand) — só usado em modo ecommerce
├── middleware.ts             # Redireciona /carrinho e /checkout/* em modo catalog
└── tailwind.config.ts
```

---

## 🚀 Rodando localmente

```bash
npm install
cp .env.local.example .env.local
# edite o .env.local conforme abaixo
npm run dev
# abre em http://localhost:3000
```

### Variáveis de ambiente

```bash
# Modo do site
NEXT_PUBLIC_MODE=catalog     # ou "ecommerce"

# E-mail dos orçamentos (Resend)
RESEND_API_KEY=re_xxx        # https://resend.com/api-keys
EMAIL_TO=incomolas@gmail.com
EMAIL_FROM=Incomolas Orçamentos <onboarding@resend.dev>
```

> Sem `RESEND_API_KEY` o app continua funcional — o formulário responde "ok" mas o servidor só loga o conteúdo no console em vez de enviar. Útil em dev.

---

## ✏️ Editando conteúdo

| Quero alterar… | Mexa em… |
| --- | --- |
| Produtos do mostruário | [`lib/products.ts`](lib/products.ts) |
| Categorias e descrições | [`lib/categories.ts`](lib/categories.ts) |
| Fotos das molas | substitua os arquivos em [`public/products/`](public/products/) (mantenha o nome) |
| Texto da página Sobre | [`app/sobre/page.tsx`](app/sobre/page.tsx) |
| Hero da Home | [`components/home/Hero.tsx`](components/home/Hero.tsx) |
| Endereço/CNPJ/contato no rodapé | [`components/Footer.tsx`](components/Footer.tsx) |
| Template do e-mail recebido pela Incomolas | [`lib/email-template.ts`](lib/email-template.ts) |

---

## 📦 Deploy — passo a passo

Roteiro completo do zero até estar online em `https://incomolas.com.br`.

### 1️⃣ Subir o código para o GitHub (5 min)

1. Crie um repo **privado** em github.com chamado `incomolas-web` (sem README, sem .gitignore — vamos usar os locais).
2. Pegue a URL `git@github.com:SEU_USUARIO/incomolas-web.git`.
3. No terminal:
   ```bash
   cd web
   git remote add origin git@github.com:SEU_USUARIO/incomolas-web.git
   git push -u origin main
   ```

### 2️⃣ Importar na Vercel (2 min)

1. Entre em [vercel.com](https://vercel.com) com sua conta GitHub.
2. **Add New → Project** → seleciona o repo `incomolas-web`.
3. Framework Preset: **Next.js** (autodetectado).
4. **Environment Variables** (adicione antes do primeiro deploy):
   ```
   NEXT_PUBLIC_MODE = catalog
   EMAIL_TO         = incomolas@gmail.com
   EMAIL_FROM       = Incomolas Orçamentos <onboarding@resend.dev>
   RESEND_API_KEY   = (preencha depois do passo 3)
   ```
5. Clica **Deploy**. Em ~2 min está online em `incomolas-web.vercel.app`.

### 3️⃣ Cadastrar a Resend para enviar e-mails (10 min)

1. Cadastre-se em [resend.com](https://resend.com) usando `incomolas@gmail.com`.
2. Em **API Keys** → **Create API Key** (permission: *Sending access*).
3. Copia a chave (`re_…`).
4. Volta na Vercel → **Project Settings → Environment Variables** → edita `RESEND_API_KEY` e cola.
5. **Deployments → … → Redeploy** para aplicar.

> Free tier: 100 e-mails/dia, 3.000/mês. Sobra muito para um institucional.

### 4️⃣ Apontar `incomolas.com.br` para a Vercel (5 min de config + até 1h propagar)

1. Vercel → **Project → Settings → Domains** → adiciona `incomolas.com.br` e `www.incomolas.com.br`.
2. A Vercel mostra os DNS records necessários. Geralmente:
   - `A` no apex (`@`) → `76.76.21.21`
   - `CNAME` no `www` → `cname.vercel-dns.com`
3. Entre no [registro.br](https://registro.br) → **Meus Domínios → incomolas.com.br → DNS**.
4. Crie os registros pedidos pela Vercel.
5. Aguarde 5–60 min. A Vercel emite SSL automático (Let's Encrypt) assim que o DNS resolver.

### 5️⃣ (Recomendado, depois) Validar `incomolas.com.br` na Resend

Para enviar de `orcamento@incomolas.com.br` em vez de `onboarding@resend.dev`:

1. Resend → **Domains → Add Domain** → `incomolas.com.br`.
2. Copia os registros SPF, DKIM e (opcional) DMARC.
3. registro.br → DNS de `incomolas.com.br` → adiciona os 3 registros.
4. Aguarda validação (até 1h) → status fica "Verified".
5. Vercel → env var `EMAIL_FROM` → troca para `Incomolas <orcamento@incomolas.com.br>` → redeploy.

Isso melhora muito a entregabilidade (chega menos no spam) e dá ar profissional ao remetente.

---

## 💸 Custo

| Item | Custo |
| --- | --- |
| Domínio `.com.br` (registro.br) | ~R$ 40/ano |
| Vercel Hobby | R$ 0 |
| Resend Free | R$ 0 |
| **Total** | **~R$ 3,33/mês** |

Free dá tranquilamente para meses ou anos de operação. Quando crescer, Vercel Pro = US$ 20/mês e Resend Pro = US$ 20/mês.

---

## 🔄 Mudando para modo e-commerce no futuro

Quando estiver pronto para vender online:

1. Vercel → Settings → Environment Variables → `NEXT_PUBLIC_MODE = ecommerce`.
2. Redeploy.
3. Pronto: carrinho, checkout, Pix/cartão/boleto/faturado voltam a aparecer.
4. (Próximos passos opcionais) integrar gateway de pagamento real (Stripe, Asaas, Pagar.me, Mercado Pago) na rota `/checkout/pagamento` — mas isso é trabalho de uma sprint, não está incluído nesta versão.

---

## 🧰 Scripts

```bash
npm run dev    # dev server (porta 3000)
npm run build  # build de produção
npm run start  # serve build
npm run lint   # lint
```
