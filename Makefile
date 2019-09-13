install-deps:
	npm install

build-prod:
	npm run build-prod

build-dev:
	npm run build-dev

lint:
	npx eslint .

test:
	npm test

devel: build-dev
	npx nodemon --exec npx babel-node './index.js'

start: build-prod
	cp -r ./views ./dist/
	cp -r ./public ./dist/
	cp -r ./models ./dist/
	node ./dist/server.js

prepare:
	touch .env

compose-build:
	docker-compose build

compose-install:
	docker-compose run web npm install

compose-db-setup:
	docker-compose run web npx sequelize db:migrate

compose-setup: prepare compose-build compose-install compose-db-setup

compose-devel:
	docker-compose run web npm run build-dev
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
