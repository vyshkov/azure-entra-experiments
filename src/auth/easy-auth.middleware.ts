// This file is not used and added for an alternative authentication demo

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EasyAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log all headers for debugging
    console.log('Request Headers:', req.headers);

    // Get the X-MS-CLIENT-PRINCIPAL header
    const clientPrincipalHeader = req.headers['x-ms-client-principal'];

    if (clientPrincipalHeader && typeof clientPrincipalHeader === 'string') {
      try {
        // Decode base64-encoded header
        const decoded = Buffer.from(clientPrincipalHeader, 'base64').toString(
          'utf-8',
        );
        const clientPrincipal = JSON.parse(decoded);

        // Attach user info to request object
        req['user'] = {
          userId: clientPrincipal.userId,
          userDetails: clientPrincipal.userDetails,
          name: clientPrincipal.claims?.find(
            (claim: any) => claim.typ === 'name',
          )?.val,
          email: clientPrincipal.claims?.find(
            (claim: any) => claim.typ === 'emails',
          )?.val,
          roles:
            clientPrincipal.claims
              ?.filter((claim: any) => claim.typ === 'roles')
              .map((claim: any) => claim.val) || [],
          decoded,
        };
        console.log('Parsed User:', req['user']);
      } catch (error) {
        console.error('Error parsing X-MS-CLIENT-PRINCIPAL:', error);
      }
    } else {
      console.warn('No X-MS-CLIENT-PRINCIPAL header found');
      req['user'] = null;
    }

    next();
  }
}
