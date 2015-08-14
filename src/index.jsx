import appRouter from "./router";
const ROOT = "/";


console.log("calling history start");

appRouter.myStart({
	root: ROOT
});

console.log("end");