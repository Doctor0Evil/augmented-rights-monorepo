import Link from "next/link";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Augmented Rights Wallet">
      <p>Citizen and verifier portal for chartered rights.</p>
      <ul>
        <li>
          <Link href="/register">Registration</Link>
        </li>
        <li>
          <Link href="/charters">Charter Management</Link>
        </li>
        <li>
          <Link href="/proofs">Proofs & Verification</Link>
        </li>
      </ul>
    </Layout>
  );
}
