import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoute = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/crud', homeController.getCRUDPage);
  router.post('/create-user', homeController.createUser);

  return app.use('/', router);
};

export default initWebRoute;
