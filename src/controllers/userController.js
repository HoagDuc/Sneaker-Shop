import userService from '../services/userService';

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing input parameter',
    });
  }

  let userData = await userService.handleLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.User ? userData.User : {},
  });
};

const handleGetAllUser = async (req, res) => {
  let id = req.query.id; //All,id
  let users = await userService.handleGetAllUser(id);

  if (id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: 'ok',
      users,
    });
  }
  return res.status(200).json({
    errCode: 1,
    errMessage: 'Missing required parameters!',
    users,
  });
};

const handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);

  return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters!',
    });
  }
  let message = await userService.editUser(data);

  return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters!',
    });
  }
  let message = await userService.deleteUser(req.body.id);

  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
};
