import express, { Router } from 'express';
import TestController from '../controllers/TestController';

const router = Router();
const testController = new TestController();

router.get('/', testController.get);

export default router;