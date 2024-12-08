.PHONY: all curl_create curl_list

DOCKER_IMAGE_API := rain-tracker

curl_create:
# Create a POST request to the api service
# running in Docker compose or on the host
# Creates a record in the database for the
# given `x-userId`.
	curl -v \
	-X POST \
	-H 'Content-Type: application/json' \
	-H 'x-userId: abc123' \
	http://localhost:3000/api/data \
	-d '{"rain": $(RAIN)}'


curl_list:
# Create a GET request to the api service
# running in Docker compose or on the host.
# Returns all records in the database for
# the given `x-userId`.
	curl -v \
	-X GET \
	-H 'Content-Type: application/json' \
	-H 'x-userId: abc123' \
	http://localhost:3000/api/data
