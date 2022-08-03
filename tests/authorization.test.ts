import { allowed } from '../src/authorization';
import {policyType} from '../src/types';

const tokenClaims = {
  jti: "3b1f8b0a-c992-4ce9-bd17-e5d019a41927",
  sub: "repo:mthbernardes/actions-test:ref:refs/heads/main",
  aud: "o6s",
  ref: "refs/heads/main",
  sha: "cda8f4bb7ff68962f831673c55479f536703c391",
  repository: "mthbernardes/actions-test",
  repository_owner: "mthbernardes",
  repository_owner_id: "12648924",
  run_id: "2722236659",
  run_number: "18",
  run_attempt: "1",
  repository_visibility: "private",
  repository_id: "516191529",
  actor_id: "12648924",
  actor: "mthbernardes",
  workflow: "generate-token",
  head_ref: "",
  base_ref: "",
  event_name: "workflow_dispatch",
  ref_type: "branch",
  job_workflow_ref: "mthbernardes/actions-test/.github/workflows/generate-token.yml@refs/heads/main",
  iss: "https://token.actions.githubusercontent.com",
  nbf: 1658544724,
  exp: 1658545624,
  iat: 1658545324
}

describe('testing authorization.', () => {
  test('when it allow', () => {
    const policy: policyType = {
      action: "test",
      permissions: [{repository_owner: 'mthbernardes'}],
      description: 'test policy',
      inputs: []
    }
    expect(allowed(tokenClaims, policy)).toBe(true)
  })

  test('when it contains permissions and does not allow.', () => {
    const policy: policyType = {
      action: "test",
      permissions: [{repository_owner: 'banana'}],
      description: 'test policy',
      inputs: []
    }
    expect(allowed(tokenClaims, policy)).toBe(false)
  })

  test('when it does not contain permissions and do not allow it.', () => {
    const policy: policyType = {
      action: "test",
      permissions: [],
      description: 'test policy',
      inputs: []
    }
    expect(allowed(tokenClaims, policy)).toBe(false)
  })
})
