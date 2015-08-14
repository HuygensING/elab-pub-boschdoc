import appRouter from "./router";
const ROOT = "/elaborate/publication/boschdoc/development";


console.log("calling history start");

appRouter.myStart({
	root: ROOT
});

console.log("end");