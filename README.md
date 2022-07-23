# Akita
Github action responsible to authenticate/authorize calls made to workflows via `repository_dispatch` trigger.

## Policy

```
{
  "action": "action_name",
    "permissions": [{
      "repository": "mthbernardes/banana",
      "ref": "refs/heads/main"
    }],
    "description": "action description",
    "inputs": ["actions","inputs","goes","here"] 
}
```
