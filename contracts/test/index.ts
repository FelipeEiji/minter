import { ethers } from "hardhat";

describe("Deploy", function () {
  it("Should deploy the contract", async function () {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy({ gasPrice: 150000000000 });
    await marketplace.deployed();
  });

  it("Should deploy the contract", async function () {
    const MinterToken = await ethers.getContractFactory("MinterToken");
    const minterToken = await MinterToken.deploy();
    await minterToken.deployed();
  });
});
