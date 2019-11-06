build:
	docker build . -t benbergstein/bread:latest

install:
	docker-compose run app install

start:
	docker-compose up -d

stop:
	docker-compose down --remove-orphans
