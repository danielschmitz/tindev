const axios = require("axios");
const Dev = require("../model/dev");

module.exports = {
  async armazenar(req, res) {
    const { username } = req.body;
    const usuarioExiste = await Dev.findOne({ usuario: username });

      if (usuarioExiste) {

        const loggedSocket = req.connectedUsers[usuarioExiste._id];
        if (loggedSocket) {
          req.io.emit('message', { title: "Usuário logou novamente", message: `Vamos das as boas vindas ao usuário ${username}` })
        }
        
        return res.json(usuarioExiste);
      }
    const resposta = await axios.get(
      `https://api.github.com/users/${username}`
    ); // Acessará a API
    const { name, bio, avatar_url } = resposta.data;
    const dev = await Dev.create({
      nome: name || username,
      usuario: username,
      bio,
      avatar: avatar_url
    });

    const newUserSocket = req.connectedUsers[resposta.data.id];
    if (newUserSocket) {
      req.io.emit('message', { title: "Novo usuário cadastrado", message: `O usuário ${username} acabou de entrar no tindev!` })
    }

    return res.json(dev);
  },
  async listar(req, res) {
    const { usuario } = req.headers;
    const usuarioLogado = await Dev.findById(usuario);
    const usuarios = await Dev.find({
      $and: [
        { _id: { $ne: usuario } },
        { _id: { $nin: usuarioLogado.likes } },
        { _id: { $nin: usuarioLogado.dislikes } }
      ]
    });
    return res.json(usuarios);
  }
};
