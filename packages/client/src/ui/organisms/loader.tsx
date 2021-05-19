import React, { useContext } from "react"
import Spinner from "react-loader-spinner"
import styled, { ThemeContext } from "styled-components"
import logo from "@assets/logo.jpg"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export function Loader() {
  const t = useContext(ThemeContext)

  return (
    <Wrapper>
      <img src={logo} alt="splash" width={50} />
      <Spinner
        type="ThreeDots"
        color={t.colors.primaryDark}
        height={40}
        width={40}
      />
    </Wrapper>
  )
}
