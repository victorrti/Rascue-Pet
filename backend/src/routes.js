const express = require('express');
const multer = require('multer');
const multerconfig = require('./config/multer')
const {celebrate,Segments,Joi}  = require('celebrate')

const petsController = require('./controller/petsController')
const profilePetsController = require('./controller/profilePetsController')
const donosController = require('./controller/donosController')
const positionsController = require('./controller/positionController')
const sessionController = require('./controller/sessionController')
const imagemController = require('./controller/imageController')
const meusPetsController = require('./controller/meusPetsController')
const umpet = require('./controller/umPet')


const routes  = express.Router();

routes.post('/pets',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        value:Joi.string().required(),
        description:Joi.string().required()

    })

}),petsController.create);

routes.get('/pets',petsController.index);
routes.put('/pets',petsController.updatepet);
routes.delete('/pets/:id',petsController.delete);

routes.get('/profile',profilePetsController.index);


routes.post('/donos',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(12),
    })

}),donosController.create);
routes.get('/donos',donosController.index);


routes.post('/positions',celebrate({
    [Segments.BODY]: Joi.object().keys({
        description:Joi.string(),
        cidade: Joi.string().required(),
        rua: Joi.string().required(),
        numero:Joi.string(),
        bairro:Joi.string().required(),
        uf:Joi.string().required().min(2).max(2),
         latitude: Joi.number().required(),
          longitude: Joi.number().required()

    })
}),positionsController.create)

routes.get('/positions',positionsController.index)


routes.post('/sessions',sessionController.create)

routes.post('/imagem', multer(multerconfig).single("file"),imagemController.create)
routes.get('/imagem',imagemController.index)
routes.delete('/imagem',imagemController.delete)

routes.get('/meuspets',meusPetsController.index)

routes.get('/umpet',umpet.index)




module.exports = routes;