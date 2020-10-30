import { Router } from 'express';

import orphanagesController from './controllers/OrphanagesController';

const OrphanagesController = new orphanagesController();

const routes = Router();

routes.get('/', OrphanagesController.index);

export default routes;