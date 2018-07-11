<template>
  <div class="listaDisciplinas">
  <cadastra-disciplina ref="cadastraDisciplina" @listarDisciplinas="listar()" />
  <v-flex xs12>
      <v-card class="elevation-10">
        <v-card-title primary-title>
          <div>
              <h3 class="headline mb-0">Disciplinas</h3>
          </div>
        </v-card-title>
        <v-btn @click="cadastrar()">
            <v-icon>add</v-icon>
            Adicionar
        </v-btn>
        <v-data-table hide-actions :headers="headers" :items="disciplinas" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.nome }}</td>
            <td>
              <v-icon small @click="editar(props.item)">
                edit
              </v-icon>
              <v-icon small @click="remover(props.index, props.item)">
                delete
              </v-icon>
            </td>
          </template>
      </v-data-table>
      </v-card>
  </v-flex>
  </div>
</template>

<script>
import DisciplinaServico from '@/service/DisciplinaServico'
import CadastraDisciplina from './CadastraDisciplina'
export default {
  name: 'ListaDisciplinas',
  components: {
    CadastraDisciplina
  },
  data () {
    return {
        headers: [
          { text: 'Nome', value: 'nome' },
          { text: '', value: '' }
        ],
        disciplinas: []
    }
  },
  methods: {
    cadastrar () {
      this.$refs.cadastraDisciplina.modal = true
    },
    async editar (disciplina) {
      this.$refs.cadastraDisciplina.disciplina = await DisciplinaServico.editar(disciplina)
      this.$refs.cadastraDisciplina.modal = true
    },
    remover (indice, disciplina) {
      DisciplinaServico.remover(disciplina).then((data) => {
        this.listar()
      })
    },
    listar () {
      DisciplinaServico.listarTodos().then((data) => {
        this.disciplinas = data
      })
    }
  },
  mounted: function () {
    this.listar()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
