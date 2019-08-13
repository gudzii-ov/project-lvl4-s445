install-deps:
	npm install

lint:
	npx eslint .

start:
	npx nodemon --exec npx babel-node './server.js'
