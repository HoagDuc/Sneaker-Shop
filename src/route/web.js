import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

const router = express.Router();

const initWebRoute = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/crud', homeController.getCRUDPage);
  router.get('/edit-user', homeController.getEditUser);

  router.post('/create-user', homeController.createUser);
  router.post('/put-user', homeController.updateUser);
  router.post('/delete-user', homeController.deleteUser);

  router.post('/api/login', userController.handleLogin);
  router.get('/api/get-all-user', userController.handleGetAllUser);
  router.post('/api/create-new-user', userController.handleCreateNewUser);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);

  return app.use('/', router);
};

export default initWebRoute;
