import React from "react";
import styled from "styled-components";

const NFTCard = ({ nft }) => {
  return (
    <NftCard>
      <NftPhoto style={{ backgroundImage: `url(${nft && nft.image})` }} />
      <div style={{ margin: 5 }}>
        <NftCollectionText>{nft && nft.symbol}</NftCollectionText>
        <NftName>{nft && nft.name}</NftName>
        <NftName style={{ float: "right" }}>{`x${nft && nft.copies} `}</NftName>
      </div>
    </NftCard>
  );
};

const NftCollectionText = styled.div`
  font-size: 12px;
  color: gray;
`;

const NftName = styled.div`
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
`;

const NftPhoto = styled.div`
  display: block;
  width: 200px;
  height: 200px;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  margin: 0 auto;
`;

const NftCard = styled.div`
  width: 200px;
  height: 250px;
  margin: auto;
  border-radius: 10px;
  padding: 0;
  cursor: pointer;
  box-shadow: 8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff;
`;

export default NFTCard;
