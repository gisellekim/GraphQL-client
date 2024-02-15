import { Text } from "./Text"
import { TextBox } from "./TextBox"

type FieldProps = {
  label: string // it will be displayed in from t of input
  top?: number | string // it represents an offset from the top
  onSubmit(): void // it is an input submit handler that triggers on pressing the Enter key
}

export const Field = ({ label, top, onSubmit }: FieldProps) => {
  return (
    <>
      <Text top={top}>{label}</Text>
      <TextBox top={top} left={label.length} onSubmit={onSubmit} />
    </>
  )
}
