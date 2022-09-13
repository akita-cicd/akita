"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClaims = void 0;
const tslib_1 = require("tslib");
const jose = tslib_1.__importStar(require("jose"));
const ISSUER = 'https://token.actions.githubusercontent.com';
const AUDIENCE = process.env.AUDIENCE;
const GITHUB_JWKS_URL = 'https://token.actions.githubusercontent.com/.well-known/jwks';
async function extractClaims(token) {
    const JWKS = jose.createRemoteJWKSet(new URL(GITHUB_JWKS_URL));
    const { payload } = await jose.jwtVerify(token, JWKS, {
        issuer: ISSUER,
        audience: AUDIENCE,
    });
    return payload;
}
exports.extractClaims = extractClaims;
//# sourceMappingURL=token.js.map