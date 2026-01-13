import { useState } from "react";
import { randomId } from "../../utils/random";
import { createCharter } from "../lib/api";

export function RegistrationFlow() {
  const [did, setDid] = useState<string | null>(null);
  const [charterId, setCharterId] = useState<string | null>(null);

  const handleRegister = async () => {
    const newDid = `did:example:${randomId(8)}`;
    setDid(newDid);

    const result = await createCharter({
      subjectDid: newDid,
      bundleCode: "NEURORIGHTS_V1",
      jurisdiction: "US-AZ",
      charter: { sections: [] }
    });

    setCharterId(result.id);
  };

  return (
    <section>
      <h2>Registration</h2>
      <button onClick={handleRegister}>Create DID & Charter</button>
      {did && <p>DID: {did}</p>}
      {charterId && <p>Charter Commitment ID: {charterId}</p>}
    </section>
  );
}
