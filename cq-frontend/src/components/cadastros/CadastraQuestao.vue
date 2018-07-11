<template>
  <div class="cadastraQuestao">
   <v-dialog v-model="modal" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-flex xs12>
      <v-card class="elevation-10">
        <v-toolbar  color="amber">
          <v-btn flat dark @click.native="modal = false">
            <v-icon>close</v-icon>
            Fechar
          </v-btn>
          <v-toolbar-title>Cadastrar Questão</v-toolbar-title>
        </v-toolbar>
        <v-flex xs12 sm6 offset-sm3>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select :items="disciplinas" @change="changedValue" v-model="questao.assunto.disciplina.id" :rules="disciplinaRegra" label="Disciplina" required></v-select>
            <v-select :items="assuntos" v-model="questao.assunto.id" :rules="assuntoRegra" label="Assunto" required></v-select>
            <v-textarea label="Enunciado" required v-model="questao.enunciado" :rules="enunciadoRegra" :counter="500"></v-textarea>
            <v-textarea label="Opção Correta" required v-model="opcao1.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
            <v-textarea label="Opção 2" required v-model="opcao2.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
            <v-textarea label="Opção 3" required v-model="opcao3.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
            <v-textarea label="Opção 4" required v-model="opcao4.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
            <v-textarea label="Opção 5" required v-model="opcao5.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
            <v-textarea label="Observação" required v-model="questao.observacao" :rules="obsRegra" :counter="1000"></v-textarea>
            <v-btn :disabled="!valid" @click="cadastrar()">
              <v-icon>save</v-icon>
              {{labelBtn}}
            </v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-flex>
  </v-dialog>
  </div>
</template>

<script>
import DisciplinaServico from '@/service/DisciplinaServico'
import AssuntoServico from '@/service/AssuntoServico'
import QuestaoServico from '@/service/QuestaoServico'
import Opcao from '../dominio/Opcao'
// import Assunto from '../dominio/Assunto'
import Questao from '../dominio/Questao'
import FiltroAssunto from '../dominio/FiltroAssunto'
export default {
  name: 'CadastraQuestao',
  data () {
    return {
      labelBtn: 'Cadastrar',
      modal: false,
      questao: new Questao(),
      opcao1: new Opcao('', true),
      opcao2: new Opcao('', false),
      opcao3: new Opcao('', false),
      opcao4: new Opcao('', false),
      opcao5: new Opcao('', false),
      assuntos: [],
      disciplinas: [],
      valid: true,
      enunciadoRegra: [
        v => !!v || 'Enunciado é obrigatório',
        v => (v && v.length <= 500) || 'O enunciado não pode ser mais do que 60 characters'
      ],
      assuntoRegra: [
        v => !!v || 'Assunto é obrigatório'
      ],
      disciplinaRegra: [
        v => !!v || 'Disciplina é obrigatório'
      ],
      obsRegra: [
        v => !!v || 'Observação é obrigatória',
        v => (v && v.length <= 1000) || 'Observação não pode ser mais do que 1000 characters'
      ],
      opcaoRegra: [
        v => !!v || 'Opção é obrigatória',
        v => (v && v.length <= 500) || 'Opção não pode ser mais do que 500 characters'
      ]
    }
  },
  methods: {
    cadastrar () {
      if (this.$refs.form.validate()) {
        this.questao.opcoes.push(this.opcao1)
        this.questao.opcoes.push(this.opcao2)
        this.questao.opcoes.push(this.opcao3)
        this.questao.opcoes.push(this.opcao4)
        this.questao.opcoes.push(this.opcao5)
        QuestaoServico.salvar(this.questao).then((data) => {
          this.$emit('listarQuestoes')
          this.modal = false
        })
      }
    },
    async changedValue (value) {
      this.assuntos = await AssuntoServico.listarCombo(new FiltroAssunto('', value))
    },
    editar (questao) {
      this.questao = questao
      this.opcao1 = new Opcao(questao.opcoes[0].descricao, questao.opcoes[0].correta)
      this.opcao2 = new Opcao(questao.opcoes[1].descricao, questao.opcoes[1].correta)
      this.opcao3 = new Opcao(questao.opcoes[2].descricao, questao.opcoes[2].correta)
      this.opcao4 = new Opcao(questao.opcoes[3].descricao, questao.opcoes[3].correta)
      this.opcao5 = new Opcao(questao.opcoes[4].descricao, questao.opcoes[4].correta)
      this.questao.opcoes = []
    }
  },
  mounted: async function () {
    this.disciplinas = await DisciplinaServico.listarTodosCombo()
  },
  watch: {
    modal: {
      handler () {
        if (this.questao.id) {
          this.labelBtn = 'Atualizar'
        }
        if (!this.modal) {
          this.assuntos = []
          let cadastraQuestao = this
          setTimeout(function () {
            cadastraQuestao.questao = new Questao()
            cadastraQuestao.opcao1 = new Opcao('', true)
            cadastraQuestao.opcao2 = new Opcao('', false)
            cadastraQuestao.opcao3 = new Opcao('', false)
            cadastraQuestao.opcao4 = new Opcao('', false)
            cadastraQuestao.opcao5 = new Opcao('', false)
            cadastraQuestao.labelBtn = 'Cadastrar'
          }, 50)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
