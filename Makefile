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

prepare:
	touch .env

compose-build:
	docker-compose build

compose-install:
	docker-compose run web npm install

compose-setup: prepare compose-build compose-install

compose-devel:
	docker-compose run web npm run build
	docker-compose up

compose-kill:
	docker-compose kill

compose-dist-build:
	rm -rf dist
	docker-compose run web make build
