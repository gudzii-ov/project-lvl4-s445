install-deps:
	npm install

lint:
	npx eslint .

start-devel:
	npx nodemon --exec npx babel-node './server.js'

start:
	rm -rf dist
	npm run build-server
	node ./dist/server.js
