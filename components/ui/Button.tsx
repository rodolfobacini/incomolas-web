import { cn } from "@/lib/cn";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost" | "steel" | "green";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  ghost: "btn-ghost",
  steel: "btn-steel",
  green: "btn-green",
};

const SIZE: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  children?: React.ReactNode;
  onClick?: never;
  type?: never;
  target?: "_blank" | "_self";
  rel?: string;
  download?: boolean | string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const cls = cn("btn", VARIANT[variant], SIZE[size], props.className);

  if ("href" in props && props.href) {
    const linkProps = props as ButtonAsLink;
    return (
      <Link
        href={linkProps.href}
        className={cls}
        target={linkProps.target}
        rel={linkProps.rel ?? (linkProps.target === "_blank" ? "noopener noreferrer" : undefined)}
        {...(linkProps.download !== undefined ? { download: linkProps.download as boolean } : {})}
      >
        {props.children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    href: _h,
    ...rest
  } = props as ButtonAsButton & { href?: undefined };
  return (
    <button className={cls} {...rest}>
      {props.children}
    </button>
  );
}
