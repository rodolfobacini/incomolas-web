import { NextResponse, type NextRequest } from "next/server";

const MODE = process.env.NEXT_PUBLIC_MODE ?? "catalog";

export function middleware(req: NextRequest) {
  if (MODE === "ecommerce") return NextResponse.next();

  // catalog mode → redirect carrinho/checkout to /orcamento
  const url = req.nextUrl.clone();
  url.pathname = "/orcamento";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/carrinho", "/checkout/:path*"],
};
