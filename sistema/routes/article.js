import routerx from "express-promise-router";
import articleController from "../controllers/ArticleController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifyWharehouse, articleController.add);
router.get("/query", auth.verifyWharehouse, articleController.query);
router.get("/list", auth.verifyWharehouse, articleController.list);
router.put("/update", auth.verifyWharehouse, articleController.update);
router.delete("/remove", auth.verifyWharehouse, articleController.remove);
router.put("/activate", auth.verifyWharehouse, articleController.activate);
router.put("/deactivate", auth.verifyWharehouse, articleController.deactivate);

export default router;
