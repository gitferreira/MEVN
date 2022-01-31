import routerx from "express-promise-router";
import saleController from "../controllers/SaleController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifyVendor, saleController.add);
router.get("/query", auth.verifyVendor, saleController.query);
router.get("/list", auth.verifyVendor, saleController.list);
// router.put("/update", auth.verifyVendor, saleController.update);
// router.delete("/remove", auth.verifyVendor, saleController.remove);
router.put("/activate", auth.verifyVendor, saleController.activate);
router.put("/deactivate", auth.verifyVendor, saleController.deactivate);
router.get("/stats12Months", auth.verifyUser, saleController.stats12Months);
router.get("/checkDates", auth.verifyUser, saleController.checkDates);

export default router;
