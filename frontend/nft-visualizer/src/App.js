import NFTCard from "./components/NFTCard"
import styled from "styled-components"

const nfts = [
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
  console.log(nfts)
  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <Subtiltle>The rarest and best of Super Mario World!</Subtiltle>
        <Grid>
          {nfts.map((nft, i) => (
            <NFTCard nft={nft} key={i} />
          ))}
        </Grid>
      </Container>
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
