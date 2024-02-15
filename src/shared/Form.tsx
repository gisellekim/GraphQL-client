import React, { ReactNode, useEffect, useRef } from "react"

export type FormValues = {
  textbox: string[]
}

type FormProps = {
  onSubmit(values: FormValues): void
  // react-blessed doesn't trigger a form's onSubmit() automatically when its inputs are submitted
  children(triggerSubmit: () => void): ReactNode
}

export const Form = ({ children, onSubmit }: FormProps) => {
  const form = useRef<any>()

  const triggerSubmit = () => {
    // it will call the submit() method on our form when triggered
    form.current.submit()
  }

  useEffect(() => {
    // automatically focus the form when the component is mounted
    setTimeout(() => {
      form.current.focus()
    }, 0)
  }, [])

  return (
    <blessed-form
      top={3}
      keys
      focused
      ref={form}
      style={{
        bg: "white",
      }}
      onSubmit={onSubmit}
    >
      {children(triggerSubmit)}
    </blessed-form>
  )
}
