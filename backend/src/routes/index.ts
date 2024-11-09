import { Router } from "express";
import auth from "./profile";
import report from "./report";
import reward from "./reward";
import claim from "./transaction";
import staff from "./staff";

const router = Router();

router.use(auth);
router.use(reward);
router.use(report);
router.use(claim);
router.use(staff);

export default router;
