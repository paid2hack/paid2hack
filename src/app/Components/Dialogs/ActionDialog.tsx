import { ReactNode, FC, PropsWithChildren, useState, useCallback } from 'react';
import { PropsWithClassName } from '~/ui/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../UI/dialog';

interface ActionDialogProps {
  renderContent: (closeDialog: () => void) => ReactNode;
  dialogTitle?: ReactNode;
  dialogDescription?: ReactNode;
}
export type CloseDialogCallback = () => void;

export const ActionDialog: FC<
  PropsWithChildren<PropsWithClassName<ActionDialogProps>>
> = ({
  children,
  renderContent,
  className,
  dialogTitle,
  dialogDescription,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild={true}>{children}</DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {renderContent(closeDialog)}
      </DialogContent>
    </Dialog>
  );
};
