setup:

build:
	npm install
	npm run build

run:
	node /app/proxy.js

dockertest:
	make setup
	make build
	make run
