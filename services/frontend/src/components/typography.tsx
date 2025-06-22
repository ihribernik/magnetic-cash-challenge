import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type TypographyProps = {
  className?: string;
};

type PropsWithChildrenAndClassName = PropsWithChildren<TypographyProps>;

export function H1({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
export function H2({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}
export function H3({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function H5({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-l font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}


export function P({ children, className }: PropsWithChildrenAndClassName) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
export function Blockquote({
  children,
  className,
}: PropsWithChildrenAndClassName) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export function List({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
}
export function InlineCode({
  children,
  className,
}: PropsWithChildrenAndClassName) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </code>
  );
}
export function Lead({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <p className={(cn("text-xl text-muted-foreground"), className)}>
      {children}
    </p>
  );
}
export function Large({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
}
export function Small({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}
export function Muted({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <p className={(cn("text-sm text-muted-foreground"), className)}>
      {children}
    </p>
  );
}
