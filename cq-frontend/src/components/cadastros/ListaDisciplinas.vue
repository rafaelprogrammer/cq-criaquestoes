<template>
  <div class="listaDisciplinas">
  <cadastra-disciplina ref="cadastraDisciplina" @listarDisciplinas="listar()" />
  <v-flex xs12>
       <v-card class="mb-2" color="amber lighten-3">
        <v-card-title primary-title>
          <div>
              <h2 class="headline mb-0">Disciplinas</h2>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="elevation-10">
        <v-btn @click="cadastrar()">
            <v-icon>add</v-icon>
            Adicionar
        </v-btn>
        <v-data-table hide-actions :headers="headers" :items="disciplinas" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.nome }}</td>
            <td>
              <v-btn icon small @click="editar(props.item)" title="editar">
                <v-icon medium>
                  edit
                </v-icon>
              </v-btn>
              <v-btn icon small class="hidden-xs-only hidden-md-only hidden-sm-only" @click="remover(props.index, props.item)" title="remover">
                  <v-icon medium >
                    delete
                  </v-icon>
              </v-btn>
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
      confirm('Deseja realmente excluir esta disciplina?') && DisciplinaServico.remover(disciplina).then((data) => {
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
