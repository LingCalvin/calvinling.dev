import { SnackbarProps } from '@material-ui/core';
import { AlertProps } from '@material-ui/lab';
import { useCallback, useState } from 'react';

export type UseSnackbarParams = Pick<
  SnackbarProps,
  'anchorOrigin' | 'autoHideDuration'
>;

export default function useSnackbar(params?: UseSnackbarParams) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>();
  const toggle = useCallback(() => setOpen((state) => !state), []);
  const onClose = useCallback(() => setOpen(false), []);

  const props: SnackbarProps = { open, onClose, message, ...params };
  return { props, severity, setSeverity, setMessage, setOpen, toggle };
}
