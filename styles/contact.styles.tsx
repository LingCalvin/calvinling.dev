import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1400,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: '100%',
  },
  successMessage: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default useStyles;
