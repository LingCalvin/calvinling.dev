import { Link } from '@material-ui/core';
import socialLinks from '../constants/social-links';
import useStyles from './footer.styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <div className={classes.socialLinks}>
        {socialLinks.map(({ href, text }) => (
          <Link key={href} href={href} target="_blank" rel="noreferrer">
            {text}
          </Link>
        ))}
        <Link href="/contact">Contact me</Link>
      </div>
    </footer>
  );
}
