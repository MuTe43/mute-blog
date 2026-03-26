.PHONY: setup dev run

setup:
	docker build . -t mute-blog ; \
	docker run -it --rm -v $(PWD):/app mute-blog /bin/bash -c "yarn install"

dev:
	docker run -it --rm -v $(PWD):/app -p 8001:3000 mute-blog /bin/bash -c "yarn run dev"

run:
	docker run -it --rm -v $(PWD):/app mute-blog /bin/bash

