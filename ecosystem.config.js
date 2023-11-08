module.exports = {
  apps: [
    {
      name: 'mco-panel',
      port: '3001',
      exec_mode: 'fork',
      instances: "1",
      script: 'npm run dev',
      args: 'node'
    }
  ]
}
