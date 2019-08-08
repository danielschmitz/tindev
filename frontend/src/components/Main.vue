<template>
  <div class="main-container">
    <router-link to="/">
      <img src="../assets/logo.svg" alt="Tindev" />
    </router-link>
    <ul v-if="usuarios.length > 0">
      <li v-for="usuario in usuarios" :key="usuario._id">
        <img :src="usuario.avatar" :alt="usuario.nome" />
        <footer>
          <strong>{{usuario.nome}}</strong>
          <p>{{usuario.bio}}</p>
        </footer>
        <div class="buttons">
          <button type="button" @click="darDisLike(usuario._id)">
            <img src="../assets/dislike.svg" alt="Dislike" />
          </button>
          <button type="button" @click="darLike(usuario._id)">
            <img src="../assets/like.svg" alt="Like" />
          </button>
        </div>
      </li>
    </ul>
    <div v-else class="empty">
      Acabou :(
    </div>
  </div>
</template>

<script>
import api from '../servicos/api'
export default {
  name: 'Main',
  data: function () {
    return {
      usuarios: []
    }
  },
  computed: {
    id: function () { return this.$route.params.id }
  },
  async mounted () {
    const resposta = await api.get('/devs', { headers: {
      usuario: this.id
    } })
    this.usuarios = resposta.data
  },
  methods:
  {
    async darLike (id) {
      await api.post(`devs/${id}/likes`, null, {
        headers: { usuario: this.id }
      })
      this.usuarios = this.usuarios.filter(usuario => usuario._id !== id)
    },
    async darDisLike (id) {
      await api.post(`devs/${id}/dislikes`, null, {
        headers: { usuario: this.id }
      })
      this.usuarios = this.usuarios.filter(usuario => usuario._id !== id)
    }
  }
}
</script>

<style>
.main-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
}

.main-container ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 50px;
}

.main-container ul li {
  display: flex;
  flex-direction: column;
}

.main-container ul li img {
  max-width: 100%;
}

.main-container ul li footer {
  flex: 1;
  background: #fff;
  border: 1px solid #eee;
  padding: 15px 20px;
  text-align: left;
  border-radius: 0 0 5px 5px;
}

.main-container ul li strong {
  font-size: 16px;
  color: #333;
}

.main-container ul li p {
  font: size 1;
  line-height: 20px;
  color: #999;
  margin-top: 5px;
}

.main-container ul li .buttons {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.main-container ul li .buttons button {
  height: 50px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
  border: 0;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.main-container ul li .buttons button:hover img {
  transform: translateY(-5px);
  transition: all 0.2s;
}

.main-container .empty {
  font-size: 32px;
  color: #999;
  font-weight: bold;
  margin-top: 300px;
}
</style>
