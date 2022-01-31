import routerx from "express-promise-router";
import revenueController from "../controllers/RevenueController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifyWharehouse, revenueController.add);
router.get("/query", auth.verifyWharehouse, revenueController.query);
router.get("/list", auth.verifyWharehouse, revenueController.list);
// router.put("/update", auth.verifyWharehouse, revenueController.update);
// router.delete("/remove", auth.verifyWharehouse, revenueController.remove);
router.put("/activate", auth.verifyWharehouse, revenueController.activate);
router.put("/deactivate", auth.verifyWharehouse, revenueController.deactivate);
router.get("/stats12Months", auth.verifyUser, revenueController.stats12Months);
router.get("/checkDates", auth.verifyUser, revenueController.checkDates);

export default router;
