# elab-pub-boschdoc

## How to develop/fix bugs

 1. Run `docker-compose pull && docker-compose up -d`. 
    If the image is no longer available online you can try to rebuild it locally using `docker-compose build`.
 2. Launch a browser and point it to http://localhost:3000/draft.
 3. Change files under the src directory. Browsersync will reload the page automatically.
 4. Happy hacking!

This will use the data from the online elaborate draft environment.
Since this is a read-only tool I don't think we need a mock server.
To change the api server: edit the `BASE_URL` js variable in ./src/index.html and restart the docker container.

## How to deploy to test

Push to master on this repo and check if the job `BoschDoc Frontend` on the huygens ci has run correctly.

## How to deploy to production

Push to production on this repo and run the job `BoschDoc Frontend` manually on the huygens ci. 
Select production as the deployment type.

## Where is it deployed

Prod: http://boschdoc.huygens.knaw.nl/edition/
test: http://boschdoc.huygens.knaw.nl/draft/
