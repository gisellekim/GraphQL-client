type TextBoxProps = {
  top?: string | number
  bottom?: string | number
  left?: string | number
  onSubmit(): void
}

export const TextBox = ({ onSubmit, ...rest }: TextBoxProps) => {
  return (
    <blessed-textbox
      height={1}
      style={{ bg: "white", fg: "black" }}
      keysinputOnFocus
      mouse
      onSubmit={onSubmit}
      {...rest}
    />
  )
}
