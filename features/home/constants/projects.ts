import { ProjectCardProps } from '../components/project-card';

const projects: ProjectCardProps[] = [
  {
    title: 'Basic Flashcards',
    description:
      'A full stack web application for creating, reviewing, and sharing flashcards. Users can create public decks to share with others or private decks to study for themselves. It consists of an API written using NestJS and a single-page frontend application using React.',
    tags: ['NestJS', 'Prisma', 'React', 'TypeScript'],
    demoURL: 'https://lingcalvin.github.io/basic-flashcards-react/',
    sourceURL: 'https://github.com/LingCalvin/basic-flashcards-react',
  },
  {
    title: 'weather-react',
    description:
      'A web app for viewing the current forecast built with React and TypeScript. It supports hourly and daily forecasts as well as fetching active weather alerts. Data is retrieved from the National Weather Service.',
    tags: ['React', 'TypeScript'],
    demoURL: 'https://lingcalvin.github.io/weather-react/',
    sourceURL: 'https://github.com/LingCalvin/weather-react',
  },
  {
    title: 'calvinling.dev',
    description: 'This portfolio website.',
    tags: ['Next.js', 'React', 'TypeScript'],
    demoURL: 'https://calvinling.dev',
    sourceURL: 'https://github.com/LingCalvin/calvinling.dev',
  },
];

export default projects;
