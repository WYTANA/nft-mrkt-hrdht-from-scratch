import { NFTCard } from "./components/NFTCard"
import styled from "styled-components"
import { useState } from "react"
import { NFTModal } from "./components/NFTModal"
import { ethers } from "ethers"
const axios = require("axios")

const initialNfts = [
  {
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Luigi",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Yoshi",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Donkey Kong",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Luigi",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Yoshi",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Donkey Kong",
    symbol: "SMWC",
    copies: 10,
    image: "https://via.placeholder.com/150",
  },
]

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedNft, setSelectedNft] = useState(null)
  const [nfts, setNfts] = useState(initialNfts)

  const toggleModal = (i) => {
    if (i >= 0) {
      setSelectedNft(nfts[i])
    }
    setShowModal(!showModal)
  }

  const getMetadataFromIpfs = async (tokenURI) => {
    let metadata = await axios.get(tokenURI)
    return metadata.data
  }

  const getNfts = async (address) => {
    const rpc = "https://rpc-mumbai.maticvigil.com/" //Alchemy
    const ethersProvider = new ethers.providers.JsonRpcProvider(rpc)

    // Public symbol function from SuperMarioWorldCollection state variable
    let abi = [
      "function symbol() public view returns (string memory)",
      "function tokenCount() public view returns (uint256)",
      "function uri(uint256 _tokenId) public view returns (string memory)",
      "function balanceOfBatch(address[] accounts, uint256[] ids) public view returns (uint256[])",
    ]

    // Address of deployed SMW Collection contract
    let nftCollection = new ethers.Contract(
      "0x511CA08ebD0574a1E2BD152a59235C3623b400ff",
      abi,
      ethersProvider
    )

    // Get the number of NFTs in the collection
    let numberOfNfts = (await nftCollection.tokenCount()).toNumber()
    let collectionSymbol = await nftCollection.symbol()

    // Create an array of account addresses
    let accounts = Array(numberOfNfts).fill(address)
    // Get an array of token ids (starting at 1 ...)
    let ids = Array.from({ length: numberOfNfts }, (_, i) => i + 1)
    // Get balance of NFTs in the collection
    let copies = await nftCollection.balanceOfBatch(accounts, ids)

    // Get all of the NFTs in the collection, iterate through them, and collect the data from IPFS
    let tempArray = []
    let baseUrl = ""

    for (let i = 1; i <= numberOfNfts; i++) {
      if (i === 1) {
        let tokenURI = await nftCollection.uri(i)
        baseUrl = tokenURI.replace(/\d+.json/, "")
        let metadata = await getMetadataFromIpfs(tokenURI)
        metadata.symbol = collectionSymbol
        metadata.copies = copies[i - 1]
        tempArray.push(metadata)
      } else {
        let metadata = await getMetadataFromIpfs(baseUrl + `${i}.json`)
        metadata.symbol = collectionSymbol
        metadata.copies = copies[i - 1]
        tempArray.push(metadata)
      }
    }
    setNfts(tempArray)
  }

  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <Subtiltle>The rarest and best of Super Mario World!</Subtiltle>
        <Grid>
          {nfts.map((nft, i) => (
            <NFTCard nft={nft} key={i} toggleModal={() => toggleModal(i)} />
          ))}
        </Grid>
      </Container>
      {showModal && (
        <NFTModal nft={selectedNft} toggleModal={() => toggleModal()} />
      )}
    </div>
  )
}

const Title = styled.h1`
  margin: 0;
  text-align: center;
`

const Subtiltle = styled.h4`
  margin-top: 0;
  text-align: center;
  color: gray;
`

const Container = styled.div`
  width: 70%;
  max-width: 1200px;
  margin: auto;
  margin-top: 100px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
`

export default App
