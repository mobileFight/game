import styled, { css } from "styled-components"
import { ifProp } from "@lib/styled-component-layout"
import okBtn from "@assets/ok-btn.png"
import attackButon from "@assets/attackButton.png"
import cancelBtn from "@assets/cancell-btn.png"

const imagebleButtonMixin = () => css`
  width: 50px !important;
  height: 50px;
  background-color: transparent;
  color: transparent;

  &:hover {
    opacity: 0.8;
  }
`

export const Button = styled.button<{
  minimal?: boolean
  primary?: boolean
  okBtn?: boolean
  cancelBtn?: boolean
  attackButon?: boolean
  disabled?: boolean
}>`
  outline: none;
  border: none;
  color: inherit;
  font-weight: inherit;
  cursor: pointer;
  transition: 0.4s;
  padding: 0;
  margin: 0;

  ${ifProp(
    "disabled",
    css`
      cursor: not-allowed;
      opacity: 0.3 !important;
    `,
  )}

  ${ifProp(
    "minimal",
    css`
      background-color: transparent;
    `,
  )}

  ${ifProp(
    "primary",
    css`
      background-color: ${(props) => props.theme.colors.secondary};
      border: 2px solid ${(props) => props.theme.colors.primaryDark};
      border-radius: 4px;
      max-width: 80%;
      width: 100%;
      padding: 8px;
      font-weight: bold;
      transition: 0.4s;
      font-weight: bold;

      &:hover {
        background-color: ${(props) => props.theme.colors.secondaryLight};
      }
    `,
  )}

  ${ifProp(
    "okBtn",
    css`
      background-image: url(${okBtn});

      ${imagebleButtonMixin}
    `,
  )}

  ${ifProp(
    "cancelBtn",
    css`
      background-image: url(${cancelBtn});

      ${imagebleButtonMixin}
    `,
  )};

  ${ifProp(
    "attackButon",
    css`
      background-image: url(${attackButon});

      ${imagebleButtonMixin}
      width: 77px !important;
      height: 77px;
      background-position-x: -10px;
    `,
  )};
`
