const {ethers} = require("hardhat")

main = async () => {

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldERC1155")
  const superMarioWorld = await SuperMarioWorld.deploy(
    "SuperMarioWorldERC1155",
    "SPRME"
  )

  await superMarioWorld.deployed()
  console.log("Success! Contract deployed to: ", superMarioWorld.address)

  // mint quantities (blank == 0)
  await superMarioWorld.mint(
    10, 
    "https://ipfs.io/ipfs/QmbqPPYKiMadC138h6igm87yXMQNBYTbrq3mBMQ8UHcYKN"
  )
  console.log("NFT successfully minted!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
