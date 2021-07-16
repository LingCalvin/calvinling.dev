export default interface HCaptchaJsonResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit?: boolean;
  'error-codes': ErrorCode[];
}

export type ErrorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'invalid-or-already-seen-response'
  | 'not-using-dummy-passcode'
  | 'sitekey-secret-mismatch';
