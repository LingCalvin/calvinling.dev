import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../lib/h-captcha';

export default function withCaptchaToken(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const validCaptcha = await verifyToken(req.body.token);
    if (!validCaptcha) {
      return res.status(422).json({
        statusCode: 422,
        message: 'Invalid captcha token',
        error: 'Unprocessable Entity',
      });
    }

    return handler(req, res);
  };
}
