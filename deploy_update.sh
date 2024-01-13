cd backend
rm -rf node_modules
npm i
cd .. 
cd frontend
rm -rf node_modules
npm i
npm run build
cd ..
pm2 startOrRestart ecosystem.config.js --env production