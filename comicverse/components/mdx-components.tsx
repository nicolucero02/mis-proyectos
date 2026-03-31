import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

function slugifyHeading(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function headingText(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(headingText).join("");
  }

  return "";
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      id={slugifyHeading(headingText(props.children))}
      className="text-main font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      id={slugifyHeading(headingText(props.children))}
      className="text-main font-[family-name:var(--font-heading)] mt-12 text-3xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      id={slugifyHeading(headingText(props.children))}
      className="text-main font-[family-name:var(--font-heading)] mt-10 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props) => <p className="text-muted leading-8" {...props} />,
  a: (props) => (
    <a
      href={props.href ?? "#"}
      className="font-semibold text-copper underline decoration-black/15 underline-offset-4"
    >
      {props.children}
    </a>
  ),
  blockquote: (props) => (
    <blockquote
      className="bg-elevated text-muted rounded-r-3xl border-l-4 border-copper py-2 pl-5 italic"
      {...props}
    />
  ),
  ul: (props) => <ul className="space-y-3" {...props} />,
  ol: (props) => <ol className="space-y-3" {...props} />,
  li: (props) => <li className="text-muted leading-8" {...props} />,
  code: (props) => (
    <code className="rounded-md bg-charcoal px-1.5 py-0.5 text-sm text-ivory" {...props} />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto rounded-[1.5rem] bg-charcoal px-5 py-4 text-sm text-ivory"
      {...props}
    />
  )
};
