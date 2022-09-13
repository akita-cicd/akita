interface workflowInputs { [key: string]: any }

type githubClaimsType = {
  iss?: string
  sub?: string
  aud?: string | string[]
  jti?: string
  nbf?: number
  exp?: number
  iat?: number
  ref?: string,
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
  claims?: githubClaimsType
}

export {triggerType, policyType, githubClaimsType, workflowInputs}
