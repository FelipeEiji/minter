// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Greeter = await ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");

  // await greeter.deployed();

  // const MinterToken = await ethers.getContractFactory("MinterToken");
  // const MTK = await MinterToken.deploy();

  // await MTK.deployed();

  // console.log("MinterToken deployed to:", MTK.address);

  const MinterToken = await ethers.getContractFactory("MinterToken");
  const MTK = await MinterToken.deploy({ gasPrice: 100000000000 });

  await MTK.deployed();

  console.log("MinterToken deployed to:", MTK.address);

  // const Marketplace = await ethers.getContractFactory("Marketplace");
  // const marketplace = await Marketplace.deploy({ gasPrice: 100000000000 });

  // await marketplace.deployed();

  // console.log("Marketplace deployed to:", marketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
