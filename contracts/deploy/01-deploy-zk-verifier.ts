import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const Verifier = await ethers.getContractFactory("ZkVerifier");
  const verifier = await Verifier.deploy(deployer.address, ethers.ZeroHash);
  await verifier.waitForDeployment();
  console.log("ZkVerifier:", await verifier.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
