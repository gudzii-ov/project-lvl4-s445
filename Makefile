install-deps:
	npm install

lint:
	npx eslint .

server-start:
	npx nodemon --exec babel-node './server.js'
