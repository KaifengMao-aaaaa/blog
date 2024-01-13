cd backend
rm -rf node_modules
npm i
cd .. 
cd frontend
rm -rf node_modules
npm i
cd ..
pm2 startOrRestart ecosystem.config.js --env production
cd frontend
npm run build