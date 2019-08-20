install-deps:
	npm install

lint:
	npx eslint .

build:
	npm run build

devel:
	npx nodemon --exec npx babel-node './server/index.js'

start:
	node ./dist/server.js

compose-devel:
	docker-compose up

compose-kill:
	docker-compose kill

compose-dist-build:
	rm -rf dist
	docker-compose run web make build
