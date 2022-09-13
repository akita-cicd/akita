"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const core = tslib_1.__importStar(require("@actions/core"));
const policies = tslib_1.__importStar(require("./policies"));
const authorization = tslib_1.__importStar(require("./authorization"));
const token = tslib_1.__importStar(require("./token"));
function getInput() {
    return JSON.parse(fs.readFileSync('payload.json').toString());
}
async function handler() {
    const payload = getInput();
    const matchedPolicy = policies.get(payload.action);
    const claims = await token.extractClaims(payload.client_payload.token);
    const allowed = authorization.allowed(claims, matchedPolicy);
    if (!allowed) {
        core.setFailed('Not allowed to execute the requested workflow.');
    }
    payload.claims = claims;
    fs.writeFileSync('payload.json', JSON.stringify(payload));
}
;
handler();
//# sourceMappingURL=index.js.map