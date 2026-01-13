import { execSync } from "child_process";
import path from "path";

const root = path.resolve(__dirname, "../../circuits");
const circuit = path.join(root, "hasValidCharter.circom");

execSync(`circom ${circuit} --r1cs --wasm --sym -o ${root}`, { stdio: "inherit" });
