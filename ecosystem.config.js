module.exports = {
  apps: [
    {
      name: 'protekauto-frontend',
      script: 'npm',
      args: 'run start:prod',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
    },
  ],
};
