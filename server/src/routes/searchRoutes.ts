import {Router} from 'express'
import {searchUsers} from "../controllers/searchController";

const router = Router();

router.post("/search", searchUsers);

export default router;