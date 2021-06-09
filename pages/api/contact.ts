import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../lib/h-captcha';
import * as SendGrid from '@sendgrid/mail';
import contactSchema from '../../schema/contact.schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Reject non-POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      statusCode: 405,
      message: `Cannot ${req.method} /contact`,
      error: 'Method Not Allowed',
    });
  }

  // Make sure the request body is properly formatted/exists
  if (!req.body) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Missing or improperly formatted body',
      error: 'Bad Request',
    });
  }

  // Check that the captcha token is valid
  const validCaptcha = await verifyToken(req.body.token);
  if (!validCaptcha) {
    return res.status(422).json({
      statusCode: 422,
      message: 'Invalid captcha token',
      error: 'Unprocessable Entity',
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
