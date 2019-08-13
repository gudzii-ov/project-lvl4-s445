install-deps:
	npm install

lint:
	npx eslint .

start-devel:
	npx nodemon --exec npx babel-node './server.js'

start:
	npx babel-node './server.js'
