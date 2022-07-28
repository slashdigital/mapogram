import { Router } from 'express';
import PageController from '../controllers/pages.controller';
import { handler, render } from '../config/next.server';

const router = Router();
const pageController = new PageController(handler, render);

router.get('/', pageController.showHomePage);
router.get('/maps', pageController.showMapListPage);
router.get('/maps/error', pageController.showMapErrorPage);
router.get('/maps/:id', pageController.showMapGeneration);
router.get('/maps/:id/status', pageController.showMapGenerationStatus);

export default router;
