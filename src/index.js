var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'fs';
import * as core from '@actions/core';
import * as policies from './policies';
import * as authorization from './authorization';
import * as token from './token';
function getInput() {
    return JSON.parse(fs.readFileSync('payload.json').toString());
}
function handler() {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = getInput();
        const matchedPolicy = policies.get(payload.action);
        const claims = yield token.extractClaims(payload.client_payload.token);
        const allowed = authorization.allowed(claims, matchedPolicy);
        if (!allowed) {
            core.setFailed('Not allowed to execute the requested workflow.');
        }
        payload.claims = claims;
        fs.writeFileSync('payload.json', JSON.stringify(payload));
    });
}
;
handler();
