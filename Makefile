.PHONY: all down stop up

DOCKER_IMAGE := rain-tracker

all:
	@echo "Usage: make [up|down|stop]"

down:
	@docker compose down
	@rm -rf docker/postgres/data

stop:
	@docker compose stop

up:
	@docker compose up --detach

docker_build:
	@docker build -t $(DOCKER_IMAGE) .

docker_run:
	@docker run --env-file .env \
		--name $(DOCKER_IMAGE) \
		--rm \
		--publish 3000:3000 \
		$(DOCKER_IMAGE)
