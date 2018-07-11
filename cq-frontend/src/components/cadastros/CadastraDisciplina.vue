<template>
  <div class="cadastraDisciplina">
   <v-dialog v-model="modal"
      width="500">
    <v-flex xs12>
      <v-card class="elevation-10">
        <v-card-title primary-title>
          <div>
              <h3 class="headline mb-0">Cadastrar Disciplina</h3>
          </div>
        </v-card-title>
        <v-flex xs12 sm6 offset-sm3>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="disciplina.nome" :rules="nomeRegra" :counter="60"
              label="Name" required></v-text-field>
            <v-btn :disabled="!valid" @click="cadastrar()">
              {{labelBtn}}
            </v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-flex>
  </v-dialog>
  </div>
</template>

<script>
import DisciplinaServico from '@/service/DisciplinaServico'
import Disciplina from '../dominio/Disciplina'
export default {
  name: 'CadastraDisciplina',
  data () {
    return {
      labelBtn: 'Cadastrar',
      modal: false,
      disciplina: new Disciplina(),
      valid: true,
      nomeRegra: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 60) || 'O nome não pode ter mais do que 60 characters'
      ]
    }
  },
  methods: {
    cadastrar () {
      if (this.$refs.form.validate()) {
        DisciplinaServico.salvar(this.disciplina).then((data) => {
          this.$emit('listarDisciplinas')
          this.modal = false
        })
      }
    }
  },
  watch: {
    modal: {
      handler () {
        if (this.disciplina.id) {
          this.labelBtn = 'Atualizar'
        }
        if (!this.modal) {
          this.disciplina = new Disciplina()
          this.labelBtn = 'Cadastrar'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
