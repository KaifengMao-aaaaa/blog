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
      "post-deploy": "pm2 startOrRestart ecosystem.config.js --env production && cd frontend && npm run build",
      "post-setup": "cd backend && npm i && cd .. && cd frontend && npm i",
    }
}
}