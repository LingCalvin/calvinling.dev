import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1400,
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
  desktopOnly: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobileOnly: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  offset: {
    scrollPaddingTop: '56px',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      scrollPaddingTop: '48px',
    },
    [theme.breakpoints.up('sm')]: {
      scrollPaddingTop: '64px',
    },
  },
}));

export default useStyles;
