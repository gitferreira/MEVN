import routerx from "express-promise-router";
import categoryController from "../controllers/CategoryController";
import auth from "../middlewares/auth";

const router = routerx();

// router.post("/add", auth.verifyWharehouse, categoryController.add);
router.post("/add", categoryController.add);
router.get("/query", auth.verifyWharehouse, categoryController.query);
// router.get("/list", auth.verifyWharehouse, categoryController.list);
router.get("/list", categoryController.list);
// router.put("/update", auth.verifyWharehouse, categoryController.update);
router.put("/update", categoryController.update);
router.delete("/remove", auth.verifyWharehouse, categoryController.remove);
router.put("/activate", auth.verifyWharehouse, categoryController.activate);
router.put("/deactivate", auth.verifyWharehouse, categoryController.deactivate);

export default router;
