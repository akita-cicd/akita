"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
function get(action) {
    const files = fs.readdirSync('.github/akita/policies/');
    const matchedPolicy = files.map(function (file) {
        let policy = JSON.parse(fs.readFileSync(`.github/akita/policies/${file}`).toString());
        return policy;
    })
        .filter((policy) => {
        return policy.action === action;
    })[0];
    return matchedPolicy;
}
exports.get = get;
//# sourceMappingURL=policies.js.map