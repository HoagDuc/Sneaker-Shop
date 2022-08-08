import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoute = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/crud', homeController.getCRUDPage);
  router.get('/edit-user', homeController.getEditUser);

  router.post('/create-user', homeController.createUser);
  router.post('/put-user', homeController.updateUser);
  router.post('/delete-user', homeController.deleteUser);

  return app.use('/', router);
};

export default initWebRoute;
