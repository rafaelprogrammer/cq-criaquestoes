<template>
  <div class="cadastraAssunto">
   <v-dialog v-model="modal"
      width="500">
    <v-flex xs12>
      <v-card class="elevation-10">
        <v-card-title primary-title>
          <div>
              <h3 class="headline mb-0">Cadastrar Assunto</h3>
          </div>
        </v-card-title>
        <v-flex xs12 sm6 offset-sm3>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="assunto.descricao" :rules="descricaoRegra" :counter="60"
              label="Descrição" required></v-text-field>
            <v-select :items="disciplinas" v-model="assunto.disciplina.id" :rules="disciplinaRegra" label="Disciplina" required></v-select>
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
import AssuntoServico from '@/service/AssuntoServico'
import Assunto from '../dominio/Assunto'
export default {
  name: 'CadastraAssunto',
  data () {
    return {
      labelBtn: 'Cadastrar',
      modal: false,
      assunto: new Assunto(),
      disciplinas: [],
      valid: true,
      descricaoRegra: [
        v => !!v || 'Descrição é obrigatório',
        v => (v && v.length <= 60) || 'A descrição não pode ser mais do que 60 characters'
      ],
      disciplinaRegra: [
        v => !!v || 'Disciplina é obrigatório'
      ]
    }
  },
  methods: {
    cadastrar () {
      if (this.$refs.form.validate()) {
        AssuntoServico.salvar(this.assunto).then((data) => {
          this.$emit('listarAssuntos')
          this.modal = false
        })
      }
    }
  },
  mounted: async function () {
    this.disciplinas = await DisciplinaServico.listarTodosCombo()
  },
  watch: {
    modal: {
      handler () {
        if (this.assunto.id) {
          this.labelBtn = 'Atualizar'
        }
        if (!this.modal) {
          this.assunto = new Assunto()
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
