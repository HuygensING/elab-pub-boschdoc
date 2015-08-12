import appRouter from "./router";
const ROOT = "/boschdoc"; /* TODO: move to config */

appRouter.history.start({
	root: ROOT
});