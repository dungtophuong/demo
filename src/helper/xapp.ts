import { INestApplication } from '@nestjs/common';

/**
 * Application Nest (Global use to inject the prodiver classes)
 */
export class XApp {
  static async set(app: INestApplication) {
    global.xapp = app;
  }
  static get(): INestApplication {
    return global.xapp;
  }
}
