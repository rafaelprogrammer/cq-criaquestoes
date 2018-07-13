<template>
  <div class="revisao">
    <v-flex xs12>
    <v-card class="mb-2" color="amber lighten-3">
        <v-card-title primary-title>
          <div>
              <h2 class="headline mb-0">Revisão - {{revisao.titulo}} </h2>
          </div>
        </v-card-title>
      </v-card>
    <v-stepper v-model="passo" vertical v-if="this.revisao">
        <template v-for="(questao, indice) in revisao.questoes">
          <v-stepper-step editable  v-if="revisao.respostas[indice]" :class="revisao.respostas[indice] ? revisao.respostas[indice].opcao.correta ? 'green lighten-1' : 'red lighten-1' : ''" :key="`${indice}-step`" :step="indice + 1">
              {{ indice + 1 }} - Questão - {{questao.disciplina.nome + ' - ' + questao.assunto.descricao}}
          </v-stepper-step>
          <v-stepper-step  v-if="!revisao.respostas[indice]" :class="revisao.respostas[indice] ? revisao.respostas[indice].opcao.correta ? 'green lighten-1' : 'red lighten-1' : ''" :key="`${indice}-step`" :step="indice + 1">
              {{ indice + 1 }} - Questão - {{questao.disciplina.nome + ' - ' + questao.assunto.descricao}}
          </v-stepper-step>
          <v-stepper-content :step="indice + 1" :key="indice">
            <v-card class="mb-2" color="grey lighten-4">
              {{questao.enunciado}}
              <v-radio-group v-model="opcaoResposta">
                <v-radio v-for="(opcao, i) in questao.opcoes" :key="i" :disabled="opcaoResposta ? true : false"
                  :label="opcao.descricao"  :value="opcao"
                  @click="responder(indice, questao, opcao)"></v-radio>
              </v-radio-group>
            </v-card>
            <v-alert v-if="opcaoResposta" :value="true" :type="opcaoResposta.correta ? 'success' : 'error'">
             {{opcaoResposta.correta ? 'Acertou!!' : 'Errou'}} - {{retornarOpcaoCorreta (questao)}}
            </v-alert>
            <v-card v-if="opcaoResposta" class="mb-2" color="grey lighten-4">
               Obs: {{questao.observacao}}
            </v-card>
            <v-btn  :disabled="!revisao.respostas[indice]" color="primary" @click="proximo(indice + 1)" v-if="indice !== revisao.questoes.length - 1">
              Continue
            </v-btn>
            <v-btn color="danger" @click="voltar(indice + 1)" v-if="indice !== 0">Voltar</v-btn>
          </v-stepper-content>
        </template>
    </v-stepper>
    </v-flex>
  </div>
</template>

<script>
import RevisaoServico from '@/service/RevisaoServico'
import Revisao from '../dominio/Revisao'
import Resposta from '../dominio/Resposta'
export default {
  name: 'Revisao',
  data () {
    return {
      passo: 1,
      revisao: '',
      opcaoResposta: '',
      respostas: []
    }
  },
  methods: {
      proximo (n) {
        this.passo = n + 1
      },
      voltar (n) {
        this.passo = n - 1
      },
      responder (indice, questao, opcao) {
        this.opcaoResposta = opcao
        this.revisao.respostas[indice] = new Resposta(null, questao, opcao)
        RevisaoServico.atualizar(this.revisao)
      },
      retornarOpcaoCorreta (questao) {
        for (let i in questao.opcoes) {
          if (questao.opcoes[i].correta) {
            return questao.opcoes[i].descricao
          }
        }
      }
  },
  mounted: async function () {
    this.revisao = await RevisaoServico.editar(new Revisao(this.$route.params.id))
    if (!this.revisao.respostas) {
      for (let i in this.revisao.questoes) {
        this.revisao.questoes[i].opcoes = this.revisao.questoes[i].opcoes.sort(function () { return (Math.round(Math.random()) - 0.5) })
      }
      this.revisao.respostas = []
    } else {
      this.opcaoResposta = this.revisao.respostas[0].opcao
    }
  },
  watch: {
    passo: {
      handler () {
        if (this.revisao.respostas[this.passo - 1]) {
          this.opcaoResposta = this.revisao.respostas[this.passo - 1].opcao
        } else {
          this.opcaoResposta = ''
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
