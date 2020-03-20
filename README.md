# Visma Tasks API
Collects tasks from Visma HRM

## Example:

User authenticates using Microsoft Graph and the onPremisesSamAccountName is gathered from there.

#### POST /api/tasks
Authentication: Bearer \<Microsoft Graph API token>

#### Result: 
```json
{
  "user": {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users(id,userPrincipalName,onPremisesSamAccountName,displayName)/$entity",
      "id": "7f4ec5f4-f0d5-400a-bc5e-50cfaccd7113",
      "userPrincipalName": "mats.andreassen@vtfk.no",
      "onPremisesSamAccountName": "matsa",
      "displayName": "Mats Andreassen"
    },
    "tasks": [
      {
        "systemid": "visma",
        "title": "Timelister til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/TIMESHEET",
        "number": "1",
        "timestamp": 1584696760516
      },
      {
        "systemid": "visma",
        "title": "Personalmeldinger til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/PERSONAL_FORMS_PROCESS",
        "number": "1",
        "timestamp": 1584696760516
      }
    ]
```

## Development

You'll need the [now-cli](https://zeit.co/now) installed to do local development.

- Clone the repo
- Install the dependencies: ```$ npm i```
- Add local environment variables
- Start the development server: ```$ now dev```

### Environment variables
.env
```
GRAPH_ME_ENDPOINT=https://graph.microsoft.com/v1.0/me
VISMA_URL=http://vismaserver:8080/hrm_ws/secure/tasks/username/
VISMA_USERNAME=task-ws
VISMA_PASSWORD=Passw0rd
CACHE=false
PAPERTRAIL_HOSTNAME=visma-tasks-api
PAPERTRAIL_HOST=logs.papertrailapp.com
PAPERTRAIL_PORT=12345
```

## Deployment

- Make sure you have set all secrets/envs in [now.json](now.json).
- Deploy to Zeit.now: ```$ now --prod```


## License

[MIT](LICENSE)