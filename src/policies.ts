import * as fs from 'fs';
import {policyType} from './types';

export function get(action: string) : policyType {
  const files: string[] = fs.readdirSync('.github/akita/policies/');
  const matchedPolicy: policyType = files.map(function(file) {
    let policy: policyType = JSON.parse(fs.readFileSync(`policies/${file}`).toString());
    return policy;
  })
    .filter((policy) => {
      return policy.action === action;
    })[0];
  return matchedPolicy;
}
