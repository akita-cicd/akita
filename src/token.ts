import * as jose from 'jose';
import {githubClaimsType } from './types';

const ISSUER = 'https://token.actions.githubusercontent.com';
const AUDIENCE = process.env.AUDIENCE;
const GITHUB_JWKS_URL = 'https://token.actions.githubusercontent.com/.well-known/jwks';

export async function extractClaims(token: string) : Promise<githubClaimsType> {
  const JWKS = jose.createRemoteJWKSet(new URL(GITHUB_JWKS_URL));
  const {payload, protectedHeader} = await jose.jwtVerify(token, JWKS, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });
  console.log(protectedHeader)
  return payload as githubClaimsType;
}
