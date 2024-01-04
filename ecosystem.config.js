module.exports = {
  apps : [{
    name   : "backend",
    script : "npm",
    args: "start",
    cwd: "./backend",
    env_production: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: "development"
    } 
  }],
  deploy: {
    production: {
      user: "root",
      host: "81.71.102.71",
      ref: "origin/main",
      repo: "git@github.com:KaifengMao-aaaaa/blog.git",
      path: "/root/projects/blog",
      "post-deploy": "bash deploy_update && pm2 startOrRestart ecosystem.config.js --env production",
      "post-setup": "bash deploy_setup",
    }
}
}