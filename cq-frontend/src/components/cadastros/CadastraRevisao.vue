<template>
  <div class="cadastraRevisao">
   <v-dialog v-model="modal" transition="dialog-bottom-transition">
    <v-flex xs12>
      <v-card class="elevation-10">
        <v-toolbar>
          <v-toolbar-title>Criar Revisão</v-toolbar-title>
        </v-toolbar>
        <v-flex xs12 sm6 offset-sm3>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select :items="disciplinas" @change="changedValue" v-model="filtroRevisao.idDisciplina" :rules="disciplinaRegra" label="Disciplina" required></v-select>
            <v-select :items="assuntos" v-model="filtroRevisao.idAssunto" label="Assunto"></v-select>
            <v-text-field v-model="filtroRevisao.titulo" :rules="tituloRegra" :counter="60"
              label="Título" required></v-text-field>
            <v-btn :disabled="!valid" @click="criar()">
              <v-icon>save</v-icon>
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
import RevisaoServico from '@/service/RevisaoServico'
import DisciplinaServico from '@/service/DisciplinaServico'
import AssuntoServico from '@/service/AssuntoServico'
import FiltroAssunto from '../dominio/FiltroAssunto'
import FiltroRevisao from '../dominio/FiltroRevisao'
export default {
  name: 'CadastraRevisao',
  data () {
    return {
      labelBtn: 'Criar',
      modal: false,
      assuntos: [],
      disciplinas: [],
      filtroRevisao: new FiltroRevisao(),
      valid: true,
      disciplinaRegra: [
        v => !!v || 'Disciplina é obrigatório'
      ],
      tituloRegra: [
        v => !!v || 'Título é obrigatório',
        v => (v && v.length <= 60) || 'O título não pode ter mais do que 60 characters'
      ]
    }
  },
  methods: {
    criar () {
      if (this.$refs.form.validate()) {
        RevisaoServico.criar(this.filtroRevisao).then((data) => {
          this.$emit('listarRevisoes')
          this.modal = false
        })
      }
    },
    async changedValue (value) {
      this.assuntos = await AssuntoServico.listarCombo(new FiltroAssunto('', value))
    }
  },
  mounted: async function () {
    this.disciplinas = await DisciplinaServico.listarTodosCombo()
  },
  watch: {
    modal: {
      handler () {
        if (!this.modal) {
          this.assuntos = []
          this.filtroRevisao = new FiltroRevisao()
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
