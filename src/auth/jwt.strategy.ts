/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { BACKEND_CLIENT_ID, TENANT_ID } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: BACKEND_CLIENT_ID, // backend App Registration ID
      audience: `api://${BACKEND_CLIENT_ID}`,
      validateIssuer: true,
      passReqToCallback: false,
      loggingLevel: 'info',
      issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    });
  }

  async validate(payload: any) {
    console.log('✅ Validated token payload:', payload);
    return payload;
  }
}
