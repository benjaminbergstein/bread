define COMPOSE_CMD
docker-compose --project-directory .. -p bread-prod
endef

.PHONY: deploy

build:
	${COMPOSE_CMD} exec app yarn build

start:
	${COMPOSE_CMD} up -d app

deploy: start build
redeploy: undeploy deploy

undeploy:
	${COMPOSE_CMD} down --remove-orphans
