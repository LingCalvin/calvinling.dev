import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Link from 'next/link';
import { useState } from 'react';
import ContactForm, { ContactFormProps } from '../components/contact-form';
import Layout from '../components/layout';
import useIsMobile from '../hooks/use-is-mobile';
import useSnackbar from '../hooks/use-snackbar';
import useStyles from '../styles/contact.styles';
import Head from 'next/head';

export default function Contact() {
  const classes = useStyles();

  const isMobile = useIsMobile();

  const {
    props: { message, ...snackbarProps },
    severity,
    setSeverity,
    setMessage,
    setOpen: setSnackbarOpen,
  } = useSnackbar({
    anchorOrigin: isMobile
      ? undefined
      : { vertical: 'bottom', horizontal: 'right' },
    autoHideDuration: 6000,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: ContactFormProps['onSubmit'] = async (data) => {
    setSubmitting(true);
    setSnackbarOpen(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resJson = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        setMessage(resJson.message);
        setSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (e) {
      setMessage('An error has occurred. Please try again later.');
      setSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact Me - Calvin Ling</title>
      </Head>
      <Backdrop className={classes.backdrop} open={submitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" className={classes.content}>
        {submitted ? (
          <div className={classes.successMessage}>
            <Typography variant="h2">Thank you for your message.</Typography>
            <Typography>
              I will try to get back to you as soon as possible.
            </Typography>
            <div>
              <Link href="/" passHref>
                <Button variant="contained" color="primary">
                  Go to home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Typography variant="h2">Contact me</Typography>
            <Typography>
              Want to contact me? Leave your name, email address, and a message.
              I will try to get back to you as soon as possible.
            </Typography>
            <ContactForm onSubmit={onSubmit} />
          </>
        )}
      </Container>
      <Snackbar {...snackbarProps}>
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Layout>
  );
}
