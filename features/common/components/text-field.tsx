import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
import { useUID } from 'react-uid';

export default function TextField({ id, ...rest }: TextFieldProps) {
  const uid = useUID();
  return <MuiTextField id={id ?? uid} {...rest} />;
}
