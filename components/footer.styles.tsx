import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(3),
  },
  socialLinks: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

export default useStyles;
