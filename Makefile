install-deps:
	npm install

lint:
	npx eslint .

server-start:
	npx nodemon --exec npx babel-node './server.js'
