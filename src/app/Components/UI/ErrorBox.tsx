import { FC, ReactNode } from 'react';
import { cn } from '~/app/lib/utils';
interface ErrorBoxProps {
  className?: string;
  children: ReactNode;
}

export const ErrorBox: FC<ErrorBoxProps> = ({ className, children }) => {
  return <div className={cn('bg-red text-white', className)}>{children}</div>;
};
