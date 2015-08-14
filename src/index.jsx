import appRouter from "./router";
const ROOT = "";

console.log("INITIALIZING ROUTER");
appRouter.history.start({
	root: ROOT
});