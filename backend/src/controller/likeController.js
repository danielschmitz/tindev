const Dev = require("../model/dev");

module.exports = {
  async armazenar(req, res) {
    const { IdDev } = req.params;
    const { usuario } = req.headers;

    const loggedDev = await Dev.findById(usuario);
    const targetDev = await Dev.findById(IdDev);

    if (!targetDev) {
      return res.status(400).json({ erro: "Desenvolvedor não existe" });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      console.log("Deu match!");
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];
      if (loggedSocket) {
        req.io.to(loggedSocket).emit('math', targetDev)
      }
      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev)
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
