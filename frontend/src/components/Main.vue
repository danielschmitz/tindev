<template>
  <div class="main-container">
    <img class="avatar" :src="store.user.avatar" />
    <br />
    <router-link to="/">
      <img src="../assets/logo.svg" alt="Tindev" />
    </router-link>
    <DotLoader :loading="loading" color="#df4723" class="loader" />

    <ul v-if="usuarios.length > 0 && !loading">
      <li v-for="usuario in usuarios" :key="usuario._id">
        <img :src="usuario.avatar" :alt="usuario.nome" />
        <footer>
          <strong>{{usuario.nome}}</strong>
          <p>{{usuario.bio}}</p>
        </footer>
        <div class="buttons">
          <button type="button" @click="darDisLike($event, usuario._id)">
            <img src="../assets/dislike.svg" alt="Dislike" />
          </button>
          <button type="button" @click="darLike($event,usuario._id)">
            <img src="../assets/like.svg" alt="Like" />
          </button>
        </div>
      </li>
    </ul>
    <div v-if="usuarios.length == 0 && !loading" class="empty">Acabou :(</div>
    <div v-if="itsamatch" class="match-container">
      <img src="../assets/itsamatch.png" alt="Its a match" />
      <img class="avatar" :src="matchDev.avatar" :alt="matchDev.nome" />
      <strong>{{matchDev.nome}}</strong>
      <p>{{matchDev.bio}}</p>
      <button type="button" @click="onButtonCloseClick">Fechar</button>
    </div>
  </div>
</template>

<script>
import api from '../servicos/api'
import io from 'socket.io-client'
import store from '../servicos/store'
import { DotLoader } from '@saeris/vue-spinners'

export default {
  name: 'Main',
  components: {
    DotLoader
  },
  data: function () {
    return {
      usuarios: [],
      matchDev: null,
      loading: false,
      store
    }
  },
  computed: {
    id: function () { return this.$route.params.id },
    itsamatch: function () { return this.matchDev !== null }
  },
  async mounted () {
    try {
      this.loading = true
      const socket = io(process.env.VUE_APP_API, {
        query: { user: this.id }
      })

      socket.on('match', dev => {
        console.log('Recebi o match de ', dev.nome)
        this.matchDev = dev
      })

      socket.on('message', obj => {
        this.$notify({
          title: obj.title,
          text: obj.message
        })
      })

      const resposta = await api.get('/devs', { headers: {
        usuario: this.id
      } })
      this.usuarios = resposta.data
    } catch (error) {

    } finally {
      this.loading = false
    }
  },
  methods:
  {
    async darLike (event, id) {
      event.target.className = 'loading'

      await api.post(`devs/${id}/likes`, null, {
        headers: { usuario: this.id }
      })
      this.usuarios = this.usuarios.filter(usuario => usuario._id !== id)
    },
    async darDisLike (event, id) {
      event.target.className = 'loading'

      await api.post(`devs/${id}/dislikes`, null, {
        headers: { usuario: this.id }
      })
      this.usuarios = this.usuarios.filter(usuario => usuario._id !== id)
    },
    onButtonCloseClick () {
      this.matchDev = null
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
  justify-content: center;
  align-items: center;
}

.loader {
  margin: 0 auto;
  padding-top: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
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

.match-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
}

.match-container .avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #fff;
  margin: 30px 0;
}

.match-container strong {
  font-size: 32px;
  color: #fff;
}

.match-container p {
  margin-top: 10px;
  font-size: 20px;
  line-height: 30px;
  max-width: 400px;
  color: #fff;
}

.match-container button {
  border: 0px;
  background: none;
  font-weight: bold;
  color: #fff;
  font-size: 18px;
  margin-top: 30px;
  cursor: pointer;
}

.main-container .avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.loading img {
  opacity: 0;
  animation: fadein 2s;
  -moz-animation: fadein 2s; /* Firefox */
  -webkit-animation: fadein 2s; /* Safari and Chrome */
  -o-animation: fadein 2s; /* Opera */
}
</style>
