import bcrypt, { hash } from 'bcryptjs';
import db from '../models/index';

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

module.exports = { handleLogin };
