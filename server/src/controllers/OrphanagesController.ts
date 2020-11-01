import db from '../database/connection';
import { Request, Response } from 'express';

import { IOrphanage } from '../types/OrphanageTypeSchema';

export default class OrphanagesController {
    async index(request: Request, response: Response) {
        try {
            const { orphanageId } = request.query;

            const data = await db('orphanages')
                .select('*')
                .where(orphanageId ? { id: orphanageId } : {});

            const formatedData: IOrphanage[] = data.map( orphanage => {
                return {
                    ...orphanage,
                    location: JSON.parse(orphanage.location),
                    photoUrls: JSON.parse(orphanage.photoUrls),
                }
            });

            return response.status(200).json({ error: false, data: formatedData });
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const data = request.body as IOrphanage;

            const formatedData = {
                ...data,
                location: JSON.stringify(data.location),
                photoUrls: JSON.stringify(data.photoUrls),
            };

            await db('orphanages').insert(formatedData);

            return response.status(201).json({ error: false, data: [data] });
        } catch(err) {
            console.log(err);
            return response.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    }
}