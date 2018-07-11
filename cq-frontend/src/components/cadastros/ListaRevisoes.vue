<template>
  <div class="listaRevisoes">
  <cadastra-revisao ref="cadastraRevisao" @listarRevisoes="listar()" />
  <v-flex xs12>
      <v-card class="elevation-10">
        <v-card-title primary-title>
          <div>
              <h3 class="headline mb-0">Revisoes</h3>
          </div>
        </v-card-title>
        <v-btn @click="criar()">
            <v-icon>add</v-icon>
            Criar
        </v-btn>
        <v-data-table hide-actions :headers="headers" :items="revisoes" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.dataCriacao}}</td>
            <td>{{props.item.totalQuestoes}}</td>
            <td>{{props.item.totalAcertos}}</td>
            <td>{{ props.item.totalErros }}</td>
            <td>{{ props.item.porcentagemAcertos }}</td>
             <td>{{ props.item.concluido }}</td>
            <td width="10%">
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
import RevisaoServico from '@/service/RevisaoServico'
import CadastraRevisao from './CadastraRevisao'
export default {
  name: 'ListaRevisoes',
  components: {
    CadastraRevisao
  },
  data () {
    return {
        headers: [
          { text: 'Data', value: 'dataCriacao' },
          { text: 'Total Questões', value: 'totalQuestoes' },
          { text: 'Total Acertos', value: 'totalAcertos' },
          { text: 'Total Erros', value: 'totalErros' },
          { text: '% Acertos', value: 'porcentagemAcertos' },
          { text: 'Concluído', value: 'concluido' },
          { text: '', value: '' }
        ],
        revisoes: []
    }
  },
  methods: {
    criar () {
      this.$refs.cadastraRevisao.modal = true
    },
    remover (indice, revisao) {
      RevisaoServico.remover(revisao).then((data) => {
        this.listar()
      })
    },
    listar () {
      RevisaoServico.listarTodos().then((data) => {
        this.revisoes = data
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
