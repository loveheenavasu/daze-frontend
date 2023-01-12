module.exports = {
  apps: [
    {
      name: "client",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      watch: true,
      env: {
        NODE_ENV: "production",
        API_URL: "https://api.daze-mgmt.com",
      },
    },
  ],
};
