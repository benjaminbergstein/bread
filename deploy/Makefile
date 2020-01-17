define COMPOSE_CMD
docker-compose --project-directory .. -p bread-prod
endef

.PHONY: deploy

deploy: start build
build:
	${COMPOSE_CMD} exec app yarn build

start:
	${COMPOSE_CMD} up -d app

redeploy: undeploy deploy

undeploy:
	${COMPOSE_CMD} down --remove-orphans
