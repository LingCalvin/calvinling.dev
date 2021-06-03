import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  offset: {
    scrollPaddingTop: '56px',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      scrollPaddingTop: '48px',
    },
    [theme.breakpoints.up('sm')]: {
      scrollPaddingTop: '64px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
  about: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  appBar: {
    zIndex: 1400,
  },
  appBarNav: {
    display: 'flex',
    marginLeft: 'auto',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  aboutText: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  skillColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  projectList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),

    justifyItems: 'center',
  },
  projectListItem: {
    width: '100%',
  },
  mobileOnly: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  desktopOnly: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export default useStyles;
