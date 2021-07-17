import { Grid } from '@material-ui/core';
import { ReactNode } from 'react';

export interface LogoGridItemProps {
  children?: ReactNode;
}

export default function LogoGridItem({ children }: LogoGridItemProps) {
  return (
    <Grid item xs={6} sm={3} md={2}>
      {children}
    </Grid>
  );
}
