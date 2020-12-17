import {Request, Response} from 'express'
import {getRepository} from 'typeorm';
import * as Yup from 'yup';

import orpanageView from '../views/orpanages_view'
import Orpanages from '../models/Orpanages'

export default{
    async index(request: Request, response: Response){
        const orpanageRepository = getRepository(Orpanages);

        const orpanages = await orpanageRepository.find({
            relations: ['images']
        });

        return response.json(orpanageView.renderMany(orpanages));
    },

    async show(request: Request, response: Response){
        const orpanageRepository = getRepository(Orpanages);

        const { id } = request.params;

        const orpanage = await orpanageRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orpanageView.render(orpanage));
    },

    async create(request: Request, response: Response) {
        
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_wekends
        } = request.body;
        
        const orpanageRepository = getRepository(Orpanages);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image =>{
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_wekends: open_on_wekends === 'true',
            images,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_wekends: Yup.boolean().required(),
            images: 
                Yup.array(Yup.object().shape({
                    path: Yup.string().required(),
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const orpanage = orpanageRepository.create(data);
    
        await orpanageRepository.save(orpanage)
    
        return response.status(201).json(orpanage); //201 cria algo
    },

}