import appRouter from "./router";
import api from "./api";

const ROOT = "/elaborate/publication/boschdoc/development";

api.docroot = ROOT;

appRouter.history.start({root: ROOT});
