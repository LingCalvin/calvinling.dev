import * as SendGrid from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import withAllowedMethods from '../../features/common/middleware/with-allowed-methods';
import withCaptchaToken from '../../features/common/middleware/with-captcha-token';
import withRateLimit from '../../features/common/middleware/with-rate-limit';
import contactSchema from '../../features/contact/schema/contact.schema';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Make sure the request body is properly formatted/exists
  if (!req.body) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Missing or improperly formatted body',
      error: 'Bad Request',
    });
  }

  try {
    // Validate params
    const { name, email, message } = await contactSchema.validate(req.body, {
      abortEarly: false,
    });

    // Send email with message
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY ?? '');
    try {
      await SendGrid.send({
        to: process.env.CONTACT_EMAIL,
        from: process.env.CONTACT_EMAIL ?? '',
        subject: `Contact Form ("${name}" <${email}>)`,
        text: message,
      });
    } catch (e) {
      // The email unexpectedly failed to send
      return res
        .status(500)
        .json({ statusCode: 500, error: 'Internal Server Error' });
    }
  } catch (e) {
    // Return status code 400 if the params are not valid
    return res
      .status(400)
      .json({ statusCode: 400, message: e.errors, error: 'Bad Request' });
  }

  return res.status(200).json({ statusCode: 200, message: 'Message received' });
}

export default withAllowedMethods(
  withRateLimit(withCaptchaToken(handler), {
    ttl: parseInt(process.env.RATE_LIMIT_TTL ?? '60000'),
    limit: parseInt(process.env.RATE_LIMIT_LIMIT ?? '2'),
  }),
  { allowedMethods: ['POST'], path: '/contact' }
);
