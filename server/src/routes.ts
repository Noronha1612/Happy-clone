import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';

import orphanagesController from './controllers/OrphanagesController';

const OrphanagesController = new orphanagesController();

const routes = Router();

routes.get('/orphanages', OrphanagesController.index);

routes.post('/orphanages', celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        about: Joi.string().required(),
        instructions: Joi.string().required(),
        whatsapp: Joi.string().required(),
        location: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        }),
        photoUrls: Joi.array().items(Joi.string()).required(),
        open_hours: Joi.string().required(),
        open_on_weekends: Joi.boolean().required()
    })
}), OrphanagesController.create);

export default routes;