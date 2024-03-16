import { FC, PropsWithChildren } from "react"

export const ErrorBox: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-red text-white">{children}</div>
  )
}