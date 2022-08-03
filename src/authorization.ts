import {githubClaimsType, policyType} from './types';

export function allowed(claims: githubClaimsType, policy: policyType): Boolean {
  const allowed = policy.permissions.map((permission: githubClaimsType) => {
    const fullPermission = {
      ...claims,
      ...permission,
    };
    return JSON.stringify(fullPermission) === JSON.stringify(claims);
  }).includes(true);
  return allowed;
}
