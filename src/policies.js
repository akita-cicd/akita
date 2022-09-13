import * as fs from 'fs';
export function get(action) {
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
