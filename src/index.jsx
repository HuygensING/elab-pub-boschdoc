import appRouter from "./router";
const ROOT = "/";


console.log("calling history start");

appRouter.history.myStart({
	root: ROOT
});

console.log("end");