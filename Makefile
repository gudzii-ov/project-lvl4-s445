install-deps:
	npm install

build:
	npm run build

lint:
	npx eslint .

test:
	npm test

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

compose-console:
	docker-compose run web npx gulp console

compose-kill:
	docker-compose kill

compose-dist-build:
	rm -rf dist
	docker-compose run web make build

compose-test:
	docker-compose run web make test

compose-bash:
	docker-compose run web bash

.PHONY: test
