install-deps:
	npm install

lint:
	npx eslint .

build-server:
	npm run build-server

start-devel:
	npx nodemon --exec npx babel-node './server.js'

start:
	node ./dist/server.js
