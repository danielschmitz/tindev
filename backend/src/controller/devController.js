const axios = require("axios");
const Dev = require("../model/dev");

module.exports = {
  async armazenar(req, res) {
    const { username } = req.body;
    const usuarioExiste = await Dev.findOne({ usuario: username });
    if (usuarioExiste) return res.json(usuarioExiste);
    const resposta = await axios.get(
      `https://api.github.com/users/${username}`
    ); // Acessará a API
    const { name, bio, avatar_url } = resposta.data;
    const dev = await Dev.create({
      nome: name,
      usuario: username,
      bio,
      avatar: avatar_url
    });
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
