# elab-pub-boschdoc

## How to test locally

run `docker-compose pull && docker-compose up`. If the image is not available online you can try to rebuild using `docker-compose build`.
Launch a browser and point it to http://localhost:8080/draft when you change a file locally the server version will be updated

## How to deploy to test

Push to master on this repo and check if the job `BoschDoc Frontend` on the huygens ci has run correctly.

## How to deploy to master

Push to production on this repo and run the job `BoschDoc Frontend` manually on the huygens ci. Select production as the deployment type.

