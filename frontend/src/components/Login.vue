<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" v-show="!loading">
      <img src="../assets/logo.svg" alt="Tindev" />
      <input placeholder="Usuário do GitHub" v-model="usuario" />
      <button type="submit" >Enviar</button>
    </form>
    <DotLoader :loading="loading" color="#df4723"/>
    <div class="creditos">
      Projeto originalmente criado por <a href="https://rocketseat.com.br">RocketSeat</a>
      <br/>
      Implementação em Vue por Daniel Schmitz
      <br/>
      <a href="https://github.com/danielschmitz/tindev">https://github.com/danielschmitz/tindev</a>
    </div>
  </div>
</template>

<script scoped>
import api from '../servicos/api'
import store from '../servicos/store'
import { DotLoader } from '@saeris/vue-spinners'

export default {
  name: 'Login',
  components: {
    DotLoader
  },
  data: function () {
    return {
      usuario: '',
      loading: false
    }
  },
  methods:
  {
    async onSubmit () {
      try {
        this.loading = true

        const resposta = await api.post('/devs', {
          username: this.usuario
        })
        const { _id, avatar, nome } = resposta.data
        store.user = { _id, avatar, nome }
        this.$router.push({ path: `/dev/${_id}` })
      } catch (error) {
        this.$notify({
          title: 'Erro',
          text: 'Usuário não encontrado',
          type: 'error'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container form {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.login-container form input {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 48px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;
}

.login-container form input::placeholder {
  color: #999;
}

.login-container form button {
  margin-top: 10px;
  border: 0;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
  background: #df4723;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

.creditos {
  position: absolute;
  bottom:20px;
  color: #555;
  text-align: center;
  font-size:14px;
}
</style>
