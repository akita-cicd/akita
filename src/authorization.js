"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowed = void 0;
function allowed(claims, policy) {
    const allowed = policy.permissions.map((permission) => {
        const fullPermission = {
            ...claims,
            ...permission,
        };
        return JSON.stringify(fullPermission) === JSON.stringify(claims);
    }).includes(true);
    return allowed;
}
exports.allowed = allowed;
//# sourceMappingURL=authorization.js.map