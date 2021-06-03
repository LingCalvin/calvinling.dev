import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  tagRow: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
