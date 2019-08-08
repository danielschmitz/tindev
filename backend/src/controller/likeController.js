const Dev = require("../model/dev");

module.exports = {
  async armazenar(req, res) {
    const { IdDev } = req.params;
    const { usuario } = req.headers;

    const usuarioLogado = await Dev.findById(usuario);
    const usuarioASeDarLike = await Dev.findById(IdDev);

    if (!usuarioASeDarLike) {
      return res.status(400).json({ erro: "Desenvolvedor não existe" });
    }

    if (usuarioASeDarLike.likes.includes(usuarioLogado._id)) {
      console.log("Deu match!");
    }

    usuarioLogado.likes.push(usuarioASeDarLike._id);

    await usuarioLogado.save();

    return res.json(usuarioLogado);
  }
};
