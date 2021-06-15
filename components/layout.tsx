import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React, { ReactNode, useEffect } from 'react';
import useDrawer from '../hooks/use-drawer';
import useIsMobile from '../hooks/use-is-mobile';
import LinkInfo from '../interfaces/link-info';
import Footer from './footer';
import useStyles from './layout.styles';
import Link from 'next/link';

export interface LayoutProps {
  children: ReactNode;
  navLinks?: LinkInfo[];
}

export default function Layout({ children, navLinks = [] }: LayoutProps) {
  const classes = useStyles();

  const isMobile = useIsMobile();

  // Prevent the AppBar from overlapping a section when jumping to it from using
  // a link
  useEffect(() => {
    const { offset } = classes;
    document.documentElement.classList.add(offset);
    return () => document.documentElement.classList.remove(offset);
  }, [classes]);

  // Determine whether the AppBar should be elevated
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const {
    open: drawerOpen,
    setOpen: setDrawerOpen,
    toggle: toggleDrawer,
  } = useDrawer();

  // Close the drawer if the screen gets wide enough to accommodate the nav bar
  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile, setDrawerOpen]);

  const hasNavLinks = navLinks.length > 0;

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        elevation={scrollTrigger && !drawerOpen ? 4 : 0}
        position="fixed"
        color="inherit"
      >
        <Toolbar>
          {hasNavLinks && (
            <IconButton
              className={classes.mobileOnly}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link href="/" passHref>
            <Button className={classes.homeButton} color="inherit">
              <Typography variant="h3" component="h1">
                Calvin Ling
              </Typography>
            </Button>
          </Link>

          {hasNavLinks && (
            <nav className={`${classes.appBarNav} ${classes.desktopOnly}`}>
              {navLinks.map(({ href, text }) => (
                <Button key={href} href={href}>
                  {text}
                </Button>
              ))}
            </nav>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar style={{ visibility: 'hidden' }} />
      {hasNavLinks && (
        <Drawer
          // Note: Need to set disableRestoreFocus, otherwise the page jumps when
          // closing the drawer. See material-ui issue #10756 for more details.
          ModalProps={{ disableRestoreFocus: true }}
          open={drawerOpen}
          anchor="top"
          onClose={() => setDrawerOpen(false)}
        >
          {/* Keep the app bar from covering the menu */}
          <Toolbar />
          <List>
            {navLinks.map(({ href, text }) => (
              <ListItem
                key={href}
                button
                component="a"
                href={href}
                onClick={toggleDrawer}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <div className={classes.content}>{children}</div>
      <Footer />
    </div>
  );
}
