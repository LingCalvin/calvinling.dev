import {
  AppBar,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Footer from '../components/footer';
import ProjectCard, { ProjectCardProps } from '../components/project-card';
import projects from '../constants/projects';
import useStyles from '../styles/index.styles';
import * as skills from '../constants/skills';
import useIsMobile from '../hooks/use-is-mobile';
import useDrawer from '../hooks/use-drawer';

interface HomeProps {
  projects: ProjectCardProps[];
  frontEndSkills: string[];
  backEndSkills: string[];
}

export default function Home({
  projects,
  frontEndSkills,
  backEndSkills,
}: HomeProps) {
  const classes = useStyles();

  const isMobile = useIsMobile();

  // Prevent the AppBar from overlapping a section when jumping to it from using
  // a link
  useEffect(() => {
    document.documentElement.classList.add(classes.offset);
  }, []);

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

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <Head>
        <title>Calvin Ling</title>
      </Head>
      <AppBar
        className={classes.appBar}
        elevation={scrollTrigger && !drawerOpen ? 4 : 0}
        position="sticky"
        color="inherit"
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h3" component="h1">
            Calvin Ling
          </Typography>
          {!isMobile && (
            <nav className={classes.appBarNav}>
              <Button href="#about">About me</Button>
              <Button href="#skills">Skills</Button>
              <Button href="#projects">Projects</Button>
            </nav>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        // Note: Need to set disableRestoreFocus, otherwise the page jumps when
        // closing the drawer. See material-ui issue #10756 for more details.
        ModalProps={{ disableRestoreFocus: true }}
        open={drawerOpen}
        anchor="top"
        onClose={() => setDrawerOpen(false)}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} href="#about" onClick={toggleDrawer}>
            <ListItemText primary="About me" />
          </ListItem>
          <ListItem component={Link} href="#skills" onClick={toggleDrawer}>
            <ListItemText primary="Skills" />
          </ListItem>
          <ListItem component={Link} href="#projects" onClick={toggleDrawer}>
            <ListItemText primary="Projects" />
          </ListItem>
        </List>
      </Drawer>
      <div className={classes.content}>
        <main className={classes.main}>
          <div id="about" className={classes.about}>
            <Container>
              <Typography
                className={classes.aboutText}
                variant="h3"
                component="p"
              >
                I am a web developer with experience in React, NestJS,
                TypeScript, and JavaScript.
              </Typography>
            </Container>
          </div>
          <Container className={classes.content}>
            <section id="skills">
              <Typography className={classes.heading} variant="h2">
                Skills
              </Typography>
              <div className={classes.skillColumns}>
                <section>
                  <Typography variant="h3">Front-end</Typography>
                  <ul>
                    {frontEndSkills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <Typography variant="h3">Back-end</Typography>
                  <ul>
                    {backEndSkills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </section>
            <Divider />
            <section id="projects">
              <Typography className={classes.heading} variant="h2">
                Projects
              </Typography>
              <div className={classes.projectList}>
                {projects.map((project, i) => (
                  <ProjectCard
                    key={i}
                    className={classes.projectListItem}
                    {...project}
                  />
                ))}
              </div>
            </section>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      projects,
      frontEndSkills: skills.frontEnd,
      backEndSkills: skills.backEnd,
    },
  };
};
