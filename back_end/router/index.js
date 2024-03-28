const rootRouter = require("express").Router();

const authenticateRouter = require("./authenticate.router");
const userRouter = require("./user.router");
const uploadRouter = require("./upload.router");
const departmentRouter = require("./department.router");
const subRoute = require("./subRoute.router");
const ideaRouter = require("./ideas.router");



rootRouter.use(`/upload`, uploadRouter);
rootRouter.use(`/auth`, authenticateRouter);
rootRouter.use(`/users`, userRouter);
rootRouter.use(`/departments`, departmentRouter);
rootRouter.use("/sub-route", subRoute);
rootRouter.use("/ideas", ideaRouter);

module.exports = rootRouter;
