import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { BACKEND_CLIENT_ID, TENANT_ID } from 'src/constants';

// Define the JWT payload interface
interface JwtPayload {
  aud: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  acr: string;
  aio: string;
  amr: string[];
  appid: string;
  appidacr: string;
  email: string;
  family_name: string;
  given_name: string;
  idp: string;
  ipaddr: string;
  name: string;
  oid: string;
  rh: string;
  roles: string[];
  scp: string;
  sid: string;
  sub: string;
  tid: string;
  unique_name: string;
  uti: string;
  ver: string;
  xms_ftd?: string;
  [key: string]: unknown; // For any additional properties
}

// Define the user object that will be attached to the request
interface ValidatedUser {
  oid: string;
  email: string;
  name: string;
  roles: string[];
  [key: string]: unknown;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      identityMetadata: `https://login.microsoftonline.com/${TENANT_ID}/.well-known/openid-configuration`,
      clientID: BACKEND_CLIENT_ID, // backend App Registration ID
      audience: `api://${BACKEND_CLIENT_ID}`,
      validateIssuer: true,
      passReqToCallback: false,
      loggingLevel: 'info',
    });
  }

  validate(payload: JwtPayload): ValidatedUser {
    console.log('✅ Validated token payload:', payload);

    // Return only the necessary user information
    return {
      oid: payload.oid,
      email: payload.email,
      name: payload.name,
      roles: payload.roles || [],
      // Include any other properties you need from the payload
      sub: payload.sub,
      tid: payload.tid,
    };
  }
}
