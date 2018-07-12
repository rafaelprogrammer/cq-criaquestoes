<template>
  <div class="listaAssuntos">
  <cadastra-assunto ref="cadastraAssunto" @listarAssuntos="listar()" />
  <v-flex xs12>
       <v-card class="mb-2" color="amber lighten-3">
        <v-card-title primary-title>
          <div>
              <h2 class="headline mb-0">Assuntos</h2>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="elevation-10">
        <v-btn @click="cadastrar()">
            <v-icon>add</v-icon>
            Adicionar
        </v-btn>
        <v-data-table hide-actions :headers="headers" :items="assuntos" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.descricao }}</td>
            <td>{{props.item.disciplina ? props.item.disciplina.nome : ''}}</td>
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
import AssuntoServico from '@/service/AssuntoServico'
import CadastraAssunto from './CadastraAssunto'
export default {
  name: 'ListaAssuntos',
  components: {
    CadastraAssunto
  },
  data () {
    return {
        headers: [
          { text: 'Descrição', value: 'descricao' },
          { text: 'Disciplina', value: 'disciplina.nome' },
          { text: '', value: '' }
        ],
        assuntos: []
    }
  },
  methods: {
    cadastrar () {
      this.$refs.cadastraAssunto.modal = true
    },
    async editar (assunto) {
      this.$refs.cadastraAssunto.assunto = await AssuntoServico.editar(assunto)
      this.$refs.cadastraAssunto.modal = true
    },
    remover (indice, assunto) {
      confirm('Deseja realmente excluir este assunto?') && AssuntoServico.remover(assunto).then((data) => {
        this.listar()
      })
    },
    listar () {
      AssuntoServico.listarTodos().then((data) => {
        this.assuntos = data
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
