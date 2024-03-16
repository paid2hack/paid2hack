import { useState, useCallback, ReactNode, FC } from "react"
import { PropsWithClassName } from "~/ui/utils"
import { Dialog, DialogContent, DialogTrigger } from "./Dialog"

export type CloseDialogCallback = () => void

interface Props {
  triggerElement: ReactNode
  renderContent: (closeDialog: CloseDialogCallback) => ReactNode
}

export const ActionDialog: FC<PropsWithClassName<Props>> = ({ triggerElement, renderContent, className }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const closeDialog = useCallback(() => {
    setDialogOpen(false)
  }, [setDialogOpen])

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent className={className}>
        {renderContent(closeDialog)}
      </DialogContent>
    </Dialog>
  )
}