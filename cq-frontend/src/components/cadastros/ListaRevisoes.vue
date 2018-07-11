<template>
  <div class="listaRevisoes">
  <cadastra-revisao ref="cadastraRevisao" @listarRevisoes="listar()" />
  <v-flex xs12>
      <v-card class="mb-2" color="amber lighten-3">
        <v-card-title primary-title>
          <div>
              <h2 class="headline mb-0">Revisões</h2>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="elevation-10">
        <v-btn @click="criar()">
            <v-icon>add</v-icon>
            Criar
        </v-btn>
        <v-data-table hide-actions :headers="headers" :items="revisoes" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.dataCriacao}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.titulo}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{props.item.totalQuestoes}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{props.item.totalAcertos}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.totalErros }}</td>
            <td :class="atualizarClassPorcentagem(props.item)" :color="props.item.porcentagemAcertos < 70 ? 'red' : 'green'">{{ props.item.porcentagemAcertos + '%' }}</td>
             <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.concluido }}</td>
            <td width="10%">
             <v-icon small @click="iniciar(props.item)" title="Iniciar revisão">
                play_arrow
              </v-icon>
              <v-icon small @click="remover(props.index, props.item)" title="remover">
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
          { text: 'Título', value: 'titulo' },
          { text: 'Questões', value: 'totalQuestoes' },
          { text: 'Acertos', value: 'totalAcertos' },
          { text: 'Erros', value: 'totalErros' },
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
    iniciar (revisao) {
      this.$router.push('/revisao/' + revisao.id)
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
    },
    atualizarClassPorcentagem (revisao) {
      if (!revisao.concluido) {
        return 'text-xs-center'
      }
      return revisao.porcentagemAcertos < 70 ? 'text-xs-center red lighten-1' : 'text-xs-center green lighten-1'
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
