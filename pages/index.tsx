import { Container, Divider, Grid, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../features/common/components/layout';
import LinkInfo from '../features/common/interfaces/link-info';
import LogoGridItem from '../features/home/components/logo-grid-item';
import ProjectCard, {
  ProjectCardProps,
} from '../features/home/components/project-card';
import aboutMe from '../features/home/constants/about-me';
import projects from '../features/home/constants/projects';
import CssLogo from '../features/logos/components/css-logo';
import GitLogo from '../features/logos/components/git-logo';
import GitHubLogo from '../features/logos/components/github-logo';
import HtmlLogo from '../features/logos/components/html-logo';
import JavaScriptLogo from '../features/logos/components/javascript-logo';
import JiraLogo from '../features/logos/components/jira-logo';
import MaterialUiLogo from '../features/logos/components/material-ui-logo';
import NestJsLogo from '../features/logos/components/nestjs';
import NextLogo from '../features/logos/components/next-logo';
import ReactLogo from '../features/logos/components/react-logo';
import TypeScriptLogo from '../features/logos/components/typescript-logo';
import useStyles from '../styles/index.styles';

interface HomeProps {
  aboutMe: string;
  projects: ProjectCardProps[];
  frontEndSkills: string[];
  backEndSkills: string[];
}

export default function Home({ aboutMe, projects }: HomeProps) {
  const classes = useStyles();

  const languageLogos = [
    <TypeScriptLogo key="typescript" />,
    <JavaScriptLogo key="javascript" />,
    <HtmlLogo key="html" />,
    <CssLogo key="css" />,
  ];

  const frameworkLogos = [
    <ReactLogo key="react" />,
    <NextLogo key="next.js" />,
    <NestJsLogo key="nestjs" />,
    <MaterialUiLogo key="material-ui" />,
  ];

  const toolLogos = [
    <GitLogo key="git" />,
    <GitHubLogo key="github" />,
    <JiraLogo key="jira" />,
  ];

  return (
    <Layout navLinks={navLinks}>
      <Head>
        <title>Calvin Ling</title>
      </Head>
      <main className={`${classes.main} ${classes.content}`}>
        <div id="about" className={classes.about}>
          <Container>
            <Typography
              className={classes.aboutText}
              variant="h3"
              component="p"
            >
              {aboutMe}
            </Typography>
          </Container>
        </div>
        <Container className={classes.content}>
          <section id="skills">
            <Typography className={classes.heading} variant="h2">
              Skills
            </Typography>
            <section>
              <Typography variant="h3">Languages</Typography>
              <Grid container>
                {languageLogos.map((logo, i) => (
                  <LogoGridItem key={i}>{logo}</LogoGridItem>
                ))}
              </Grid>
            </section>
            <section>
              <Typography variant="h3">Frameworks and libraries</Typography>
              <Grid container>
                {frameworkLogos.map((logo, i) => (
                  <LogoGridItem key={i}>{logo}</LogoGridItem>
                ))}
              </Grid>
            </section>
            <section>
              <Typography variant="h3">Tools</Typography>
              <Grid container>
                {toolLogos.map((logo, i) => (
                  <LogoGridItem key={i}>{logo}</LogoGridItem>
                ))}
              </Grid>
            </section>
          </section>
          <Divider />
          <section id="projects">
            <Typography className={classes.heading} variant="h2">
              Projects
            </Typography>
            <div className={classes.projectList}>
              {projects.map((project, i) => (
                <ProjectCard key={i} {...project} />
              ))}
            </div>
          </section>
        </Container>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      aboutMe,
      projects,
    },
  };
};

const navLinks: LinkInfo[] = [
  { href: '#about', text: 'About me' },
  { href: '#skills', text: 'Skills' },
  { href: '#projects', text: 'Projects' },
];
