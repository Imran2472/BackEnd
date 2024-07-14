import express from 'express'
import { Getbook } from '../controller/book.controller.js'

const router = express.Router();

router.get("/", Getbook);

export default router;