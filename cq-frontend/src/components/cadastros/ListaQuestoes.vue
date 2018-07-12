<template>
  <div class="listaQuestoes">
  <cadastra-questao ref="cadastraQuestao" @listarQuestoes="listar()" />
  <v-flex xs12>
      <v-card class="mb-2" color="amber lighten-3">
        <v-card-title primary-title>
          <div>
              <h2 class="headline mb-0">Questões</h2>
          </div>
        </v-card-title>
      </v-card>
      <v-card class="elevation-10">
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
            <td width="20%">
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
      confirm('Deseja realmente excluir esta questão?') && QuestaoServico.remover(questao).then((data) => {
        this.listar()
      })
    },
    listar () {
      QuestaoServico.listarTodos().then((data) => {
        this.questoes = data
        console.log(this.questoes)
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
