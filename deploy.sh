#!/bin/sh

echo "Switching to branch main"
git checkout main

echo "Building app"
npm run build

echo "Deploying files to server"
rsync -avP --exclude '*.DS_Store' build/ myung@olympus.pharmacy.arizona.edu:/var/www/artemis-react/
echo "Deployment complete"