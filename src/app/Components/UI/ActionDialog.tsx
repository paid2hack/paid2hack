import { useState, useCallback, ReactNode, FC, PropsWithChildren } from "react"
import { PropsWithClassName } from "~/ui/utils"
import { Dialog, DialogContent, DialogTrigger } from "./Dialog"

export type CloseDialogCallback = () => void

interface Props {
  renderContent: (closeDialog: CloseDialogCallback) => ReactNode
}

export const ActionDialog: FC<PropsWithChildren<PropsWithClassName<Props>>> = ({ children, renderContent, className }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const closeDialog = useCallback(() => {
    setDialogOpen(false)
  }, [setDialogOpen])

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={className}>
        {renderContent(closeDialog)}
      </DialogContent>
    </Dialog>
  )
}