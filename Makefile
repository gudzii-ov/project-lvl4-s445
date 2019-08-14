install-deps:
	npm install

lint:
	npx eslint .

build:
	npm run build

start-devel:
	npx nodemon --exec npx babel-node './server/index.js'

start:
	node ./dist/server.js
