import { expect } from "chai";
import { ethers } from "hardhat";
import type { RightsBundles } from "../typechain-types";

describe("RightsBundles", () => {
  let bundles: RightsBundles;

  beforeEach(async () => {
    const [admin] = await ethers.getSigners();
    const Bundles = await ethers.getContractFactory("RightsBundles");
    bundles = await Bundles.deploy(admin.address) as RightsBundles;
    await bundles.waitForDeployment();
  });

  it("creates and updates a bundle", async () => {
    const [admin] = await ethers.getSigners();
    const code = ethers.id("NEURORIGHTS_V1");
    const jurisdiction = ethers.id("US-AZ");
    const uri = "https://example.org/bundles/neurorights-v1.json";

    const tx = await bundles.connect(admin).createBundle(code, jurisdiction, uri);
    const rc = await tx.wait();
    const bundleId = rc!.logs[0].args?.id ?? 1n;

    let bundle = await bundles.getBundle(bundleId);
    expect(bundle.code).to.eq(code);
    expect(bundle.jurisdiction).to.eq(jurisdiction);

    await bundles.connect(admin).updateBundle(bundleId, "https://example.org/bundles/neurorights-v2.json", false);
    bundle = await bundles.getBundle(bundleId);
    expect(bundle.active).to.eq(false);
  });
});
