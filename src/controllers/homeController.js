import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);

    return res.render('index.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCRUDPage = async (req, res) => {
  return res.render('crud.ejs');
};

let createUser = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  return res.redirect('/crud');
};

module.exports = { getHomePage, getCRUDPage, createUser };
