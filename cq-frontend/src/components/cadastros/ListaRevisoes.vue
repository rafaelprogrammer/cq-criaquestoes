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
        <v-layout row wrap>
          <v-flex xs8>
            <v-btn @click="criar()">
                <v-icon>add</v-icon>
                Criar
            </v-btn>
          </v-flex>
          <v-flex xs4>
            <v-text-field class="pr-5" v-model="filtro" append-icon="search" label="Search" single-line hide-details></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table :headers="headers" :items="revisoes" class="elevation-1" :search="filtro">
          <template slot="items" slot-scope="props">
            <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.dataCriacao}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.titulo}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{props.item.totalQuestoes}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{props.item.totalAcertos}}</td>
            <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.totalErros }}</td>
            <td :class="atualizarClassPorcentagem(props.item)" :color="props.item.porcentagemAcertos < 70 ? 'red' : 'green'">{{ props.item.porcentagemAcertos + '%' }}</td>
             <td :class="atualizarClassPorcentagem(props.item)">{{ props.item.concluido }}</td>
            <td :class="atualizarClassPorcentagem(props.item)">
              <v-btn icon small @click="iniciar(props.item)" title="Iniciar revisão">
                <v-icon medium>
                  play_arrow
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
import RevisaoServico from '@/service/RevisaoServico'
import CadastraRevisao from './CadastraRevisao'
export default {
  name: 'ListaRevisoes',
  components: {
    CadastraRevisao
  },
  data () {
    return {
        filtro: '',
        headers: [
          { text: 'Data', value: 'dataCriacao' },
          { text: 'Título', value: 'titulo' },
          { text: 'Questões', value: 'totalQuestoes' },
          { text: 'Acertos', value: 'totalAcertos' },
          { text: 'Erros', value: 'totalErros' },
          { text: '% Acertos', value: 'porcentagemAcertos' },
          { text: 'Concluído', value: 'concluido' },
          { text: '', value: 'iniciar' }
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
      confirm('Deseja realmente excluir esta revisão?') && RevisaoServico.remover(revisao).then((data) => {
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
