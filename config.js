module.exports = {
  CACHE: process.env.CACHE === 'true',
  visma: {
    url: process.env.VISMA_URL || 'http://localhost:8290/hrm_ws/secure/tasks/username/',
    username: process.env.VISMA_USERNAME || 'username',
    password: process.env.VISMA_PASSWORD || 'password'
  },
  graph: {
    me: {
      url: process.env.GRAPH_ME_ENDPOINT || 'https://graph.microsoft.com/v1.0/me',
      properties: 'id,userPrincipalName,onPremisesSamAccountName,displayName'
    },
    org: {
      url: process.env.GRAPH_ORG_ENDPOINT || 'https://graph.microsoft.com/v1.0/organization',
      properties: 'id',
      tenantId: process.env.GRAPH_TENANT_ID || '08f3813c-9f29-482f-9aec-16ef7cbf477a'
    }
  },
  papertrail: {
    hostname: process.env.PAPERTRAIL_HOSTNAME || 'visma-tasks-api',
    host: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
    port: process.env.PAPERTRAIL_PORT || 12345
  }
}
