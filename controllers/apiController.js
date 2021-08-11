const { v4: uuidv4 } = require("uuid");
const { User, Room } = require("../models");

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
      res.status(201).json({ message: "Register berhasil, silahkan login" });
    } catch (error) {
      res.status(400).json({ message: "Periksa kembali data data register anda" });
    }
  },
  signIn: async (req, res) => {
    try {
      const user = await User.authenticate(req.body);
      res.status(200).json(format(user));
    } catch (error) {
      res.status(400).json({ message: "Periksa kembali data data login anda" });
    }
  },
  whoAmi: (req, res) => {
    const currentUser = req.user;
    res.status(200).json(currentUser);
  },
  createRoom: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      const room = await Room.create({
        id: uuidv4(),
        playerOneId: user.id,
      });
      res.status(201).json({
        message: `Berhasil generate room dengan id : ${room.id}`,
        room,
      });
    } catch (error) {
      res.status(400).json({
        message: "userId tidak ditemukan",
        token_acces: "anda tidak memiliki token, silahkan login untuk mendapatkan token",
      });
    }
  },
  viewDataRoom: async (req, res) => {
    try {
      const room = await Room.findOne({ where: { id: req.params.id } });
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ message: "Id room tidak ditemukan" });
    }
  },
  joinRoom: async (req, res) => {
    try {
      await Room.update(
        {
          playerTwoId: req.body.playerTwoId,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json({ message: "berhasil join room" });
    } catch (error) {
      res.status(400).json({ message: "Gagal join room" });
    }
  },
};
