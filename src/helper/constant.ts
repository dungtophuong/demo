export class Constant {
  public static readonly MESSAGE_EVENT_NAME = 'do-action';
  public static readonly MESSAGE_EVENT_RESULT_NAME = 'action-result';
  public static readonly ADMIN = 1;
  public static readonly USER = 2;

  public static readonly SALT_ROUNDS: number = 10;
  public static readonly ENCRYPT_SIZE: number = 15;

  public static readonly LANGUAGE_JP: number = 1;
  public static readonly LANGUAGE_EN: number = 2;

  public static readonly DEACTIVATED_USER: number = 0;
  public static readonly DEMO_USER: number = 1;
  public static readonly PRO_USER: number = 2;

  public static readonly ASC: string = 'ASC';
  public static readonly DESC: string = 'DESC';

  public static readonly REMEMBER_SESSION: number =
    (Number(process.env.REMEMBER_TOKEN!) || 365 * 24 * 60 * 60) * 1000;
  public static readonly EXPIRED_SESSION: number =
    (Number(process.env.EXPIRED_TOKEN!) || 2 * 60 * 60) * 1000;
  public static readonly EMAIL_REGEX: any =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public static readonly LENGTH_MIN_PASSWORD: number = 12;
  public static readonly PAGE: number = 1;

  public static readonly YYYYMMDDHHMMSS: string = 'YYYY-MM-DD HH:mm:ss';
}
