import { expect } from "chai";
import { ethers } from "hardhat";
import type { RightsBundles, AugmentedRightsRegistry } from "../typechain-types";

describe("AugmentedRightsRegistry", () => {
  let bundles: RightsBundles;
  let arr: AugmentedRightsRegistry;

  beforeEach(async () => {
    const [admin] = await ethers.getSigners();
    const Bundles = await ethers.getContractFactory("RightsBundles");
    bundles = await Bundles.deploy(admin.address) as RightsBundles;
    await bundles.waitForDeployment();

    const Arr = await ethers.getContractFactory("AugmentedRightsRegistry");
    arr = await Arr.deploy(admin.address, await bundles.getAddress()) as AugmentedRightsRegistry;
    await arr.waitForDeployment();
  });

  it("registers and retrieves a charter", async () => {
    const [admin] = await ethers.getSigners();
    const code = ethers.id("NEURORIGHTS_V1");
    const jurisdiction = ethers.id("US-AZ");
    const uri = "https://example.org/bundles/neurorights-v1.json";

    const txBundle = await bundles.connect(admin).createBundle(code, jurisdiction, uri);
    const rcBundle = await txBundle.wait();
    const bundleId = rcBundle!.logs[0].args?.id ?? 1n;

    const charterHash = ethers.id("charter-1");
    const subjectDidHash = ethers.id("did:example:subject");
    const vcHash = ethers.id("vc-doc-1");
    const vcUri = "https://example.org/vc/1";

    const tx = await arr
      .connect(admin)
      .registerCharter(charterHash, subjectDidHash, bundleId, jurisdiction, vcHash, vcUri);
    const rc = await tx.wait();
    const charterId = rc!.logs[0].args?.charterId ?? 1n;

    const record = await arr.getCharter(charterId);
    expect(record.charterHash).to.eq(charterHash);
    expect(record.subjectDidHash).to.eq(subjectDidHash);
    expect(record.bundleId).to.eq(bundleId);
  });

  it("revokes a charter", async () => {
    const [admin] = await ethers.getSigners();
    const code = ethers.id("NEURORIGHTS_V1");
    const jurisdiction = ethers.id("US-AZ");
    const uri = "https://example.org/bundles/neurorights-v1.json";

    const txBundle = await bundles.connect(admin).createBundle(code, jurisdiction, uri);
    const rcBundle = await txBundle.wait();
    const bundleId = rcBundle!.logs[0].args?.id ?? 1n;

    const charterHash = ethers.id("charter-1");
    const subjectDidHash = ethers.id("did:example:subject");
    const vcHash = ethers.id("vc-doc-1");

    const tx = await arr
      .connect(admin)
      .registerCharter(charterHash, subjectDidHash, bundleId, jurisdiction, vcHash, "");
    const rc = await tx.wait();
    const charterId = rc!.logs[0].args?.charterId ?? 1n;

    await arr.connect(admin).revokeCharter(charterId);
    const record = await arr.getCharter(charterId);
    expect(record.revokedAt).to.not.eq(0);
    expect(await arr.isActive(charterId)).to.eq(false);
  });
});
