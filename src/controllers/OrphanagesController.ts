import db from '../database/connection';
import { Request, Response } from 'express';

export default class OrphanagesController {
    async index(request: Request, response: Response) {
        try {
            const { orphanageId } = request.params;

            const data = await db('orphanages')
                .select('*')
                .where(orphanageId ? { id: orphanageId } : {});

            return response.status(200).json({ error: false, data });
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    }
}