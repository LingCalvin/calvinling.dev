import { Container, Divider, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProjectCard, { ProjectCardProps } from '../components/project-card';
import projects from '../constants/projects';
import useStyles from '../styles/index.styles';
import * as skills from '../constants/skills';
import Layout from '../components/layout';
import LinkInfo from '../interfaces/link-info';
import aboutMe from '../constants/about-me';

interface HomeProps {
  aboutMe: string;
  projects: ProjectCardProps[];
  frontEndSkills: string[];
  backEndSkills: string[];
}

export default function Home({
  aboutMe,
  projects,
  frontEndSkills,
  backEndSkills,
}: HomeProps) {
  const classes = useStyles();

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
            <div className={classes.skillColumns}>
              <section>
                <Typography variant="h3">Front-end</Typography>
                <ul>
                  {frontEndSkills.map((skill) => (
                    <Typography key={skill} component="li">
                      {skill}
                    </Typography>
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
      frontEndSkills: skills.frontEnd,
      backEndSkills: skills.backEnd,
    },
  };
};

const navLinks: LinkInfo[] = [
  { href: '#about', text: 'About me' },
  { href: '#skills', text: 'Skills' },
  { href: '#projects', text: 'Projects' },
];
