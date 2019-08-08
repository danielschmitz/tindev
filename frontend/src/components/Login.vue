<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit">
      <img src="../assets/logo.svg" alt="Tindev" />
      <input placeholder="Usuário do GitHub" v-model="usuario" />
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import api from '../servicos/api'
export default {
  name: 'Login',
  data: function () {
    return {
      usuario: ''
    }
  },
  methods:
  {
    async onSubmit () {
      console.log('onSubmit')
      const resposta = await api.post('/devs', {
        username: this.usuario
      })
      const { _id } = resposta.data
      this.$router.push({ path: `/dev/${_id}` })
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
</style>
