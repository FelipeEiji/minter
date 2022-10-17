import { expect } from "chai";
import { ethers } from "hardhat";

let tcc: any;

describe("Artwork Smart Contract Tests", function () {
  this.beforeEach(async function () {
    const Tcc = await ethers.getContractFactory("Tcc");
    tcc = await Tcc.deploy("Tcc Contract", "TCC");
  });

  it("NFT is minted successfully", async function () {
    const [account1] = await ethers.getSigners();

    expect(await tcc.balanceOf(account1.address)).to.equal(0);

    const tokenURI =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    await tcc.connect(account1).mint(tokenURI);

    expect(await tcc.balanceOf(account1.address)).to.equal(1);
  });

  it("tokenURI is set sucessfully", async function () {
    const [account1, account2] = await ethers.getSigners();

    const tokenURI1 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    const tokenURI2 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/2";

    await tcc.connect(account1).mint(tokenURI1);
    await tcc.connect(account2).mint(tokenURI2);

    expect(await tcc.tokenURI(0)).to.equal(tokenURI1);
    expect(await tcc.tokenURI(1)).to.equal(tokenURI2);
  });
});
