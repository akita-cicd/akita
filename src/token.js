var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jose from 'jose';
const ISSUER = 'https://token.actions.githubusercontent.com';
const AUDIENCE = process.env.AUDIENCE;
const GITHUB_JWKS_URL = 'https://token.actions.githubusercontent.com/.well-known/jwks';
export function extractClaims(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const JWKS = jose.createRemoteJWKSet(new URL(GITHUB_JWKS_URL));
        const { payload } = yield jose.jwtVerify(token, JWKS, {
            issuer: ISSUER,
            audience: AUDIENCE,
        });
        return payload;
    });
}
