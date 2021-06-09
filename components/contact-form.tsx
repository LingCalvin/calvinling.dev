import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, TextField } from '@material-ui/core';
import { useForm, useWatch } from 'react-hook-form';
import useUniqueId from '../hooks/use-unique-id';
import contactSchema from '../schema/contact.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import useStyles from './contact-form.styles';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export interface ContactFormProps {
  onSubmit: (data: FormValues & { token: string }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const classes = useStyles();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: yupResolver(contactSchema),
  });

  const message = useWatch({ control, name: 'message', defaultValue: '' });

  const nameId = useUniqueId();
  const emailId = useUniqueId();
  const messageId = useUniqueId();

  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  return (
    <form
      className={classes.root}
      noValidate
      onSubmit={handleSubmit((data) => {
        if (!token) {
          return;
        }
        captchaRef.current?.resetCaptcha();
        setToken(null);
        onSubmit({ ...data, token });
      })}
    >
      <TextField
        id={nameId}
        fullWidth
        variant="outlined"
        label="Name"
        required
        inputProps={register('name')}
        FormHelperTextProps={{ className: classes.helperText }}
        error={errors.name !== undefined}
        helperText={errors.name?.message}
      />
      <TextField
        id={emailId}
        fullWidth
        variant="outlined"
        label="Email"
        required
        inputProps={register('email')}
        FormHelperTextProps={{ className: classes.helperText }}
        error={errors.email !== undefined}
        helperText={errors.email?.message}
      />
      <TextField
        id={messageId}
        fullWidth
        multiline
        variant="outlined"
        label="Message"
        rows={8}
        required
        inputProps={register('message')}
        FormHelperTextProps={{ className: classes.helperText }}
        error={errors.message !== undefined || message.length > 4096}
        helperText={
          errors.message?.message ?? `${message.length}/4096 characters`
        }
      />
      <div className={classes.hCaptchaContainer}>
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? ''}
          reCaptchaCompat={false}
          onExpire={() => setToken(null)}
          onVerify={setToken}
          ref={captchaRef}
        />
      </div>
      <Button
        className={classes.submitButton}
        type="submit"
        variant="contained"
        color="primary"
        disabled={token === null}
      >
        Submit
      </Button>
    </form>
  );
}
