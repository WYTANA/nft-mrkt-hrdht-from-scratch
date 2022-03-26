import styled from "styled-components"
import React from "react"

const NFTProgressBar = ({ percent }) => {
  return (
    <ProgressBarOuter>
      <ProgressBarInner style={{ width: `${percent}%` }} />
    </ProgressBarOuter>
  )
}

const ProgressBarOuter = styled.div`
  background-color: lightgray;
  border-radius: 13px;
  padding: 3px;
`

const ProgressBarInner = styled.div`
  background-color: #0077ff;
  border-radius: 7px;
  height: 10px;
  width: 40%;
`

export { NFTProgressBar }
