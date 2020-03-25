# Учебник Express часть 2: Создание скелета сайта 
(https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/skeleton_website)
--------------------------------------------------------------------------------------------

1. Применение генератора приложений

	-> npm install express-generator -g

2. Создание проекта

   -> express express-locallibrary-tutorial --view=pug

3. -> cd express-locallibrary-tutorial
   -> npm install

4. -> DEBUG=express-locallibrary-tutorial:* npm start

5. Обеспечиваем перезапуск сервера при изменении файлов

	-> npm install --save-dev nodemon
	-> "scripts": {
    			"start": "node ./bin/www",
    			"devstart": "nodemon ./bin/www"
  		},

6. -> SET DEBUG=express-locallibrary-tutorial:* & npm run devstart

7. -> git remote add origin https://github.com/robertkh/express.git
   -> git push -u origin master
   
=======

Deploying Node App to Heroku   https://dev.to/easybuoy/deploying-node-app-to-heroku-286n

Deploying using Github

After creating the application, under the deploy section, connect your Github account to Heroku and deploy the application.

Note: Heroku looks for a start script in your package.json file <-> Procfile !!!!!!!!!!!!!!!!
