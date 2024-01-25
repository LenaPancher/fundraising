import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("Token");
  const token  = await Token.deploy();

  const Crowdsale = await ethers.getContractFactory("Crowdsale");
  await Crowdsale.deploy(token, 1, 1, 10, deployer.address);

  console.log("Token address:", await token.getAddress());
  console.log("Deploying contracts with the account:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
