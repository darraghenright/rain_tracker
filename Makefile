.PHONY: all api_build api_run compose_down compose_stop compose_up

DOCKER_IMAGE_API := rain-tracker

all:
	@echo "Usage: make [up|down|stop]"

api_build:
	@docker build -t $(DOCKER_IMAGE_API) .

api_run:
	@docker run --rm \
		--env-file .env \
		--name $(DOCKER_IMAGE_API) \
		--publish 3000:3000 \
		$(DOCKER_IMAGE_API)

compose_down:
	@docker compose down
	@rm -rf docker/postgres/data

compose_stop:
	@docker compose stop

compose_up:
	@docker compose up --detach
