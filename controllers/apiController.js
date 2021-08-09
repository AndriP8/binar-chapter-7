const { User } = require("../models");

function format(user) {
  const { id, username, isAdmin } = user;
  return {
    id,
    username,
    accessToken: user.generateToken(),
    isAdmin,
    message: "Anda berhasil login",
  };
}

module.exports = {
  signUp: async (req, res) => {
    try {
      await User.register(req.body);
      res.json({ message: "Register berhasil, silahkan login" });
    } catch (error) {
      res.json({ message: "Periksa kembali data data register anda" });
    }
  },
  signIn: async (req, res) => {
    try {
      const user = await User.authenticate(req.body);
      res.json(format(user));
    } catch (error) {
      res.json({ message: "Periksa kembali data data login anda" });
    }
  },
  whoAmi: (req, res) => {
    const currentUser = req.user;
    res.json(currentUser);
  },
  createRoom: (req, res) => {},
};
