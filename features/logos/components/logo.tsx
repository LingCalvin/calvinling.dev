import { Typography } from '@material-ui/core';
import Image from 'next/image';
import useStyles from './logo.styles';

export interface LogoProps {
  src: string;
  alt: string;
  label: string;
}

export default function Logo({ src, alt, label }: LogoProps) {
  const classes = useStyles();
  return (
    <figure className={classes.root}>
      <Image draggable={false} src={src} alt={alt} height={48} width={48} />
      <Typography component="figcaption">{label}</Typography>
    </figure>
  );
}
