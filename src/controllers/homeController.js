import db from '../models/index';
import CRUDService from '../services/CRUDService';

const getHomePage = async (req, res) => {
  try {
    let data = await CRUDService.getAllUser();

    return res.render('index.ejs', {
      data: data,
    });

    return res.render('index.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const getCRUDPage = async (req, res) => {
  return res.render('createUser.ejs');
};

const createUser = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  return res.redirect('/crud');
};

const getEditUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let getDataUser = await CRUDService.getUserById(userId);

    return res.render('editUser.ejs', {
      userData: getDataUser,
    });
  } else {
    return res.send('User not found!');
  }
};

const updateUser = async (req, res) => {
  let data = req.body;
  await CRUDService.updateUser(data);

  return res.redirect('/');
};

const deleteUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDService.deleteUserById(userId);
    return res.redirect('/');
  }
  return res.send('User not found!');
};

module.exports = {
  getHomePage,
  getCRUDPage,
  createUser,
  getEditUser,
  updateUser,
  deleteUser,
};
