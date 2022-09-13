export function allowed(claims, policy) {
    const allowed = policy.permissions.map((permission) => {
        const fullPermission = Object.assign(Object.assign({}, claims), permission);
        return JSON.stringify(fullPermission) === JSON.stringify(claims);
    }).includes(true);
    return allowed;
}
