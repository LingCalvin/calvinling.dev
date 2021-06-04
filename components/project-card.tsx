import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@material-ui/core';
import Tag from '../types/tag';
import useStyles from './project-card.styles';

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: Tag[];
  demoURL?: string;
  sourceURL?: string;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  demoURL,
  sourceURL,
  className,
}: ProjectCardProps) {
  const classes = useStyles();
  return (
    <Card className={className}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h3">{title}</Typography>
        <Typography>{description}</Typography>
        <div className={classes.tagRow}>
          {tags.map((tag, i) => (
            <Chip key={i} label={tag} />
          ))}
        </div>
      </CardContent>
      {(demoURL || sourceURL) && (
        <CardActions className={classes.actionRow}>
          {demoURL && (
            <Button
              href={demoURL}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              color="primary"
            >
              Demo
            </Button>
          )}
          {sourceURL && (
            <Button
              href={sourceURL}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              color="primary"
            >
              Source
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}
