import HCaptchaJsonResponse from '../interfaces/h-captcha-json-response';

export async function verifyToken(token: string): Promise<boolean> {
  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      response: token,
      secret: process.env.HCAPTCHA_SECRET_KEY ?? '',
      sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '',
    }),
  });
  const resJson: HCaptchaJsonResponse = await res.json();
  return resJson.success;
}
