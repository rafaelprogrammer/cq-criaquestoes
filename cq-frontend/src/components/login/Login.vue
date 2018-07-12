<template>
  <div class="login">
   <v-dialog v-model="modal" persistent
      width="300">
    <v-flex xs12>
      <v-card class="elevation-10">
        <v-card-title primary-title>
          <div>
              <h3 class="headline mb-0">Autenticação - CQ</h3>
          </div>
        </v-card-title>
        <v-flex xs12 sm6 offset-sm3>
          <v-form class="mx-2" ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="login.username" :rules="usuarioRegra" :counter="10"
              label="Usuário" required></v-text-field>
            <v-text-field type="password" v-model="login.password" :rules="senhaRegra" :counter="8"
              label="Senha" required></v-text-field>
            <v-btn :disabled="!valid" @click="logar()" color="primary">
              Logar
            </v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-flex>
  </v-dialog>
  </div>
</template>

<script>
import LoginServico from '@/service/LoginServico'
import Login from '../dominio/Login'
export default {
  name: 'Login',
  data () {
    return {
      modal: false,
      valid: true,
      login: new Login(),
      usuarioRegra: [
        v => !!v || 'Usuário é obrigatório',
        v => (v && v.length <= 10) || 'O usuário não pode ter mais do que 8 characters'
      ],
      senhaRegra: [
        v => !!v || 'Senha é obrigatória',
        v => (v && v.length <= 8) || 'A senha não pode ter mais do que 8 characters'
      ]
    }
  },
  methods: {
    logar () {
      if (this.$refs.form.validate()) {
        LoginServico.logar(this.login).then((token) => {
          if (token) {
            localStorage.setItem('x-auth-token', token)
            this.modal = false
            this.$router.push('/')
          }
        })
      }
    }
  },
  mounted: function () {
    this.modal = true
  },
  watch: {
    modal: {
      handler () {
        if (!this.modal) {
          this.login = new Login()
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
