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
  createRoom: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      const room = await Room.create({
        id: uuidv4(),
        playerOneId: user.id,
      });
      res.json({
        message: `Berhasil generate room dengan id : ${room.id}`,
        room,
      });
    } catch (error) {
      res.json({ message: "userId tidak ditemukan" });
    }
  },
  viewDataRoom: (req, res) => {
    User.findAll({ include: Room })
      .then((p1) => {
        res.json(p1);
      })
      .catch((err) => {
        res.json(err);
      });
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
      res.json({ message: "berhasil join room" });
    } catch (error) {
      res.json({ message: "Gagal join room" });
    }
  },
};
