import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  hCaptchaContainer: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  helperText: {
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
  submitButton: {
    [theme.breakpoints.up('sm')]: {
      marginRight: 'auto',
    },
  },
}));

export default useStyles;
