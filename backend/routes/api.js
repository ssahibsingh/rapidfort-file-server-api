import express from "express";
import upload from "../controllers/upload.js";
import getinfo from "../controllers/getinfo.js";
import download from "../controllers/download.js";

const router = express.Router();

router.post('/upload', upload);
router.get('/file/:name', getinfo);
router.get('/download/:name', download);

export default router;