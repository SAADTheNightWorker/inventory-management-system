const express = require("express");
const userRouter = require("./userRouter");
const categoriesRouter = require("./categoriesRouter");
const unitsRouter = require("./unitsRouter");
const itemsRouter = require("./itemsRouter");
const locationsRouter = require("./locationsRouter");
const stationsRouter = require("./stationsRouter");
const transactionTypesRouter = require("./transactionTypesRouter");






const vendorRouter = require("./vendorRouter");
const paymentRouter = require("./paymentRouter");
const policyRecordRouter = require("./policyrecordRouter");
const policyRecordSecRouter = require("./policyRecordSecRouter");
const revenueRecordRouter = require("./revenueRecord");
const notifcationRouter = require("./notifcationRouter");
const policyChartRouter = require("./policyChartRoute");
const router = express.Router();





router.use("/user", userRouter);
router.use("/categories", categoriesRouter);
router.use("/units", unitsRouter);
router.use("/items", itemsRouter);
router.use("/locations", locationsRouter);
router.use("/stations", stationsRouter);
router.use("/transactionTypes", transactionTypesRouter);





router.use("/vendor", vendorRouter);
router.use("/payment", paymentRouter);
router.use("/policyRecord", policyRecordRouter);
router.use("/revenueRecord", revenueRecordRouter);
router.use("/policyData", policyChartRouter);
router.use("/policyRecordSec", policyRecordSecRouter);
router.use("/notifcation", notifcationRouter);


module.exports = router;
