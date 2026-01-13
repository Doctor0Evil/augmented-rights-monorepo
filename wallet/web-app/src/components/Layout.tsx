import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function Layout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title} - Augmented Rights</title>
      </Head>
      <header>
        <nav>
          <Link href="/">Home</Link> | <Link href="/register">Registration</Link> |{" "}
          <Link href="/charters">Charters</Link> | <Link href="/proofs">Proofs</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
