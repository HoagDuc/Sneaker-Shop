import bcrypt, { hash } from 'bcryptjs';
import db from '../models/index';
var salt = bcrypt.genSaltSync(10);

const handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ['email', 'role_id', 'password'],
          raw: true,
        });

        if (user) {
          let check = bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'Ok';

            delete user.password;
            userData.User = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = 'Wrong password';
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = 'Invalid email';
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = 'Invalid email';
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleGetAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = '';

      if (id === 'all') {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password'],
          },
        });
      }
      if (id && id !== 'all') {
        users = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ['password'],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: 'Email already exists',
        });
      }

      let hashPasswordFrombcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFrombcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        gender: data.gender === '1' ? true : false,
        role_id: data.role,
      });

      resolve({
        errCode: 0,
        message: 'ok',
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        user = await db.User.destroy({
          where: { id: id },
        });

        resolve({
          errCode: 0,
          message: 'ok',
        });
      }

      resolve({
        errCode: 2,
        message: `User isn't exists!`,
        user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;

        await user.save();
        resolve({ errCode: 0, errMessage: `Update user success!` });
      } else {
        resolve({
          errCode: 2,
          errMessage: `User isn't exists!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLogin,
  handleGetAllUser,
  createNewUser,
  deleteUser,
  editUser,
};
