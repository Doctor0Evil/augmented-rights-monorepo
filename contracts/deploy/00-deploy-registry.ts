import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const Bundles = await ethers.getContractFactory("RightsBundles");
  const bundles = await Bundles.deploy(deployer.address);
  await bundles.waitForDeployment();

  const Arr = await ethers.getContractFactory("AugmentedRightsRegistry");
  const arr = await Arr.deploy(deployer.address, await bundles.getAddress());
  await arr.waitForDeployment();

  console.log("RightsBundles:", await bundles.getAddress());
  console.log("AugmentedRightsRegistry:", await arr.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
