import * as fs from 'fs';
import {triggerType, policyType} from './types'
import * as core from '@actions/core';
import * as policies from './policies';
import * as authorization from './authorization';
import * as token from './token';

function getInput(): triggerType {
  return JSON.parse(fs.readFileSync('payload.json').toString());
}

async function handler() {
  const payload: triggerType = getInput();
  const matchedPolicy: policyType = policies.get(payload.action);
  const claims = await token.extractClaims(payload.client_payload.token);
  const allowed = authorization.allowed(claims, matchedPolicy);
  if (!allowed) {
    core.setFailed('Not allowed to execute the requested workflow.');
  }
};

handler();
