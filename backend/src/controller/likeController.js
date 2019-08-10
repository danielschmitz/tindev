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

    req.io.emit('message', { title: "<3", message: `${loggedDev.nome} curtiu ${targetDev.nome} ` })


    if (targetDev.likes.includes(loggedDev._id)) {
      console.log("Deu match!");
      const loggedSocket = req.connectedUsers[usuario];
      const targetSocket = req.connectedUsers[IdDev];
   
      if (loggedSocket) {
        console.log(`1) Enviando match do ${targetDev.nome} para ${loggedDev.nome}`)
        req.io.to(loggedSocket).emit('match', targetDev)
      }
      if (targetSocket) {
        console.log(`2) Enviando match do ${loggedDev.nome} para ${targetDev.nome}`)
        req.io.to(targetSocket).emit('match', loggedDev)
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
