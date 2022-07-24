import * as jose from 'jose';
import * as fs from 'fs';
import * as core from '@actions/core';


const ISSUER = 'https://token.actions.githubusercontent.com';
const AUDIENCE = process.env.AUDIENCE;
const GITHUB_JWKS_URL = 'https://token.actions.githubusercontent.com/.well-known/jwks';

interface workflowInputs { [key: string]: any }

type githubClaimsType = {
  iss?: string
  sub?: string
  aud?: string | string[]
  jti?: string
  nbf?: number
  exp?: number
  iat?: number
  ref: string,
  repository?: string,
  repository_id?: string,
  repository_owner?: string,
  repository_owner_id?: string,
  run_id?: string,
  run_number?: string,
  run_attempt?: string,
  actor?: string,
  actor_id?: string,
  workflow?: string,
  head_ref?: string,
  base_ref?: string,
  event_name?: string,
  ref_type?: string,
  environment?: string,
  job_workflow_ref?: string,
  repository_visibility?: string
}

type policyType = {
  action: string,
  permissions: githubClaimsType[],
  description?: string,
  inputs: string[]
}

type triggerIntentType = {
  token: string,
  workflowInputs: workflowInputs
}

type triggerType = {
  client_payload: triggerIntentType,
  branch: string,
  action: string
  repository: any
  sender: any
}

async function extractTokenClaims(token: string) : Promise<githubClaimsType> {
  const JWKS = jose.createRemoteJWKSet(new URL(GITHUB_JWKS_URL));
  const {payload} = await jose.jwtVerify(token, JWKS, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });
  return payload as githubClaimsType;
}

function checkAllowed(claims: githubClaimsType, policy: policyType): Boolean {
  const allowed = policy.permissions.map((permission) => {
    const fullPermission = {
      ...claims,
      ...permission,
    };
    return JSON.stringify(fullPermission) === JSON.stringify(claims);
  }).includes(true);
  return allowed;
}

async function getPolicies() : Promise<policyType[]> {
  const files: string[] = fs.readdirSync('policies/');
  const policies: policyType[] = files.map(function(file) {
    const policy: policyType = JSON.parse(fs.readFileSync(`policies/${file}`).toString());
    return policy;
  });
  return policies;
}

async function handler() {
  const payload: triggerType = JSON.parse(fs.readFileSync('payload.json').toString());
  const policies: policyType[] = await getPolicies();
  const matchedPolicy = policies.filter((policy) => {
    return policy.action === payload.action;
  })[0];
  const claims = await extractTokenClaims(payload.client_payload.token);
  const allowed = checkAllowed(claims, matchedPolicy);
  if (allowed) {
    process.exit(0);
  } else {
    core.setFailed('Not allowed to execute the requested workflow.');
  }
};

handler();
