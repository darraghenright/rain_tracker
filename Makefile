.PHONY: all down stop up

all:
	@echo "Usage: make [up|down|stop]"

down:
	@docker compose down
	@rm -rf docker/postgres/data

stop:
	@docker compose stop

up:
	@docker compose up --detach
