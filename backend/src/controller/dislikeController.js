const Dev = require("../model/dev");

module.exports = {
  async armazenar(req, res) {
    const { IdDev } = req.params;
    const { usuario } = req.headers;

    const usuarioLogado = await Dev.findById(usuario);
    const usuarioASeDarDislike = await Dev.findById(IdDev);

    if (!usuarioASeDarDislike) {
      return res.status(400).json({ erro: "Desenvolvedor não existe" });
    }

    usuarioLogado.dislikes.push(usuarioASeDarDislike._id);

    await usuarioLogado.save();

    return res.json(usuarioLogado);
  }
};
