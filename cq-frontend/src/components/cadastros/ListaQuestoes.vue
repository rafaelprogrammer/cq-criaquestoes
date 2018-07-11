<template>
  <div class="listaQuestoes">
  <cadastra-questao ref="cadastraQuestao" @listarQuestoes="listar()" />
  <v-flex xs12>
      <v-card class="elevation-10">
        <v-card-title primary-title>
          <div>
              <h3 class="headline mb-0">Questões</h3>
          </div>
        </v-card-title>
        <v-btn @click="cadastrar()">
            <v-icon>add</v-icon>
            Adicionar
        </v-btn>
        <v-data-table hide-actions :headers="headers" :items="questoes" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.enunciado.substr(0,150) + '...'}}</td>
            <td>{{props.item.assunto.disciplina ? props.item.assunto.disciplina.nome : ''}}</td>
            <td>{{props.item.assunto ? props.item.assunto.descricao : ''}}</td>
            <td>{{ props.item.tipoQuestao }}</td>
            <td width="10%">
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
import QuestaoServico from '@/service/QuestaoServico'
import CadastraQuestao from './CadastraQuestao'
export default {
  name: 'ListaQuestoes',
  components: {
    CadastraQuestao
  },
  data () {
    return {
        headers: [
          { text: 'Enunciado', value: 'enunciado' },
          { text: 'Disciplina', value: 'assunto.disciplina.nome' },
          { text: 'Assunto', value: 'assunto.descricao' },
          { text: 'Tipo', value: 'tipoQuestao' },
          { text: '', value: '' }
        ],
        questoes: []
    }
  },
  methods: {
    cadastrar () {
      this.$refs.cadastraQuestao.modal = true
    },
    async editar (questao) {
      questao = await QuestaoServico.editar(questao)
      this.$refs.cadastraQuestao.editar(questao)
      this.$refs.cadastraQuestao.modal = true
    },
    remover (indice, questao) {
      QuestaoServico.remover(questao).then((data) => {
        this.listar()
      })
    },
    listar () {
      QuestaoServico.listarTodos().then((data) => {
        this.questoes = data
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
