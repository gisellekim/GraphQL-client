import { PropsWithChildren, forwardRef } from "react"

type PanelProps = {
  top?: string | number
  left?: string | number
  right?: string | number
  bottom?: string | number
  height?: string | number
  width?: string | number
}

export const Panel = forwardRef<any, PropsWithChildren<PanelProps>>(
  ({ children, ...rest }, ref) => {
    return (
      <blessed-box
        ref={ref}
        focused
        mouse
        keys
        shadow
        align="center"
        border={{ type: "line" }}
        style={{
          bg: "white",
          shadow: true,
          border: {
            bg: "white",
            fg: "black",
          },
          label: { bg: "white", fg: "black" },
        }}
        {...rest}
      />
    )
  }
)
