const {ethers} = require("hardhat")

main = async () => {

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldCollection")
  const superMarioWorld = await SuperMarioWorld.deploy(
    "SuperMarioWorldCollection",
    "SPWC",
    "https://ipfs.io/ipfs/Qmb6tWBDLd9j2oSnvSNhE314WFL7SRpQNtfwjFWsStXp5A/"
  )

  await superMarioWorld.deployed()
  console.log("Success! Contract deployed to: ", superMarioWorld.address)

  // ** Mint function!!
  await superMarioWorld.mint(10) // 1
  await superMarioWorld.mint(10) // 2
  await superMarioWorld.mint(10) // etc.
  await superMarioWorld.mint(10)
  await superMarioWorld.mint(1) // 5 Rare have less copies
  await superMarioWorld.mint(1)
  await superMarioWorld.mint(1)
  await superMarioWorld.mint(1)

  console.log("NFT successfully minted!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
