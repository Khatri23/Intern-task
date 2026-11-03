import koarouter from "@koa/router";
import auth from "../middleware/auth.js";
import roleGuard from "../middleware/roleguard.js";
import * as roleController from "../controller/role.js";

const router = new koarouter({prefix:"/api/roles"});

router.get("/", auth, roleGuard, roleController.displayRoles);
router.get("/:id", auth, roleGuard, roleController.getRoleById);
router.post("/", auth, roleGuard, roleController.addRole);
router.put("/:id", auth, roleGuard, roleController.updateRole);
router.delete("/:id", auth, roleGuard, roleController.removeRole);

export default router;
