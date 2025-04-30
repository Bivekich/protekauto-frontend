module.exports = {
  apps: [
    {
      name: 'protekauto-frontend',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
    },
  ],
};
