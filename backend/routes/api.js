import express from "express";
import upload from "../controllers/upload.js";
import getinfo from "../controllers/getinfo.js";

const router = express.Router();

router.post('/upload', upload);
router.get('/file/:name', getinfo);

export default router;