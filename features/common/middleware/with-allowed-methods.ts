import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export type Method =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

interface WithAllowedMethodsParams {
  allowedMethods: Method[];
  path: string;
}

export default function withAllowedMethods(
  handler: NextApiHandler,
  { allowedMethods, path }: WithAllowedMethodsParams
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!allowedMethods.includes(req.method as Method)) {
      return res.status(405).json({
        statusCode: 405,
        message: `Cannot ${req.method} ${path}`,
        error: 'Method Not Allowed',
      });
    }

    return handler(req, res);
  };
}
