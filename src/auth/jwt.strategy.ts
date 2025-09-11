/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class JwtStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      identityMetadata: `https://login.microsoftonline.com/060e0979-b29c-46cc-9075-0c0478bffd3e/v2.0/.well-known/openid-configuration`,
      clientID: '2b9758a9-513d-46df-bdc4-b16117654611', // Backend App Registration (Application ID)
      audience: 'api://2b9758a9-513d-46df-bdc4-b16117654611',
      validateIssuer: true,
      passReqToCallback: false,
      loggingLevel: 'info',
    });
  }

  validate(token: any) {
    // Passport-Azure-AD already validates signature, audience, issuer
    return token; // This will be attached to req.user
  }
}
