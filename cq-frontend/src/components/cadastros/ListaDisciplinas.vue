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
        <v-layout row wrap>
          <v-flex xs8>
            <v-btn @click="cadastrar()">
                <v-icon>add</v-icon>
                Adicionar
            </v-btn>
          </v-flex>
          <v-flex xs4>
            <v-text-field class="pr-5" v-model="filtro" append-icon="search" label="Search" single-line hide-details></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table :headers="headers" :items="disciplinas" class="elevation-1" :search="filtro">
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
        filtro: '',
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
