const {ethers} = require("hardhat")

async function main() {

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldOZ")
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldOZ", "SPRMO")

  await superMarioWorld.deployed()
  console.log("Success! Contract deployed to: ", superMarioWorld.address)

  // mint one at a time
  await superMarioWorld.mint(
    "https://ipfs.io/ipfs/QmTuqznk8ws9oy1Xer21BqoAYRRxgNBioEqK7LyDLJc2uW"
  )
  console.log("NFT successfully minted!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
