import { useState } from "react";

export function ProofVerifier() {
  const [result, setResult] = useState<string | null>(null);

  const handleVerify = async () => {
    // TODO: integrate with zk verifier contract.
    setResult("Proof verified (placeholder).");
  };

  return (
    <section>
      <h2>Proof Verification</h2>
      <button onClick={handleVerify}>Verify Last Proof</button>
      {result && <p>{result}</p>}
    </section>
  );
}
