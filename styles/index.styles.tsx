import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  about: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  aboutText: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  appBarNav: {
    display: 'flex',
    marginLeft: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
  projectList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
    justifyItems: 'stretch',
  },
  skillColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
}));

export default useStyles;
