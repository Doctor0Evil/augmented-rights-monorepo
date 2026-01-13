import { useState } from "react";
import { generateDummyProof } from "../lib/zk";

export function ProofGenerator() {
  const [proof, setProof] = useState<string | null>(null);

  const handleGenerate = async () => {
    const p = await generateDummyProof();
    setProof(p);
  };

  return (
    <section>
      <h2>Proof Generation</h2>
      <button onClick={handleGenerate}>Generate Example Proof</button>
      {proof && <pre>{proof}</pre>}
    </section>
  );
}
