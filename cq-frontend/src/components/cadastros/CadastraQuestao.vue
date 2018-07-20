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
            <v-select :items="tiposQuestoes" v-model="questao.tipoQuestao" :rules="tipoQuestaoRegra" label="Tipo Quesão" required></v-select>
            <v-select :items="disciplinas" @change="changedValue" v-model="questao.disciplina.id" :rules="disciplinaRegra" label="Disciplina" required></v-select>
            <v-select :items="assuntos" v-model="questao.assunto.id" :rules="assuntoRegra" label="Assunto" required></v-select>
            <v-chip color="primary" text-color="white">Enunciado:</v-chip>
            <vue-editor v-model="questao.enunciado"></vue-editor>
            <div v-if="isCertoErrado()">
              <v-text-field v-model="opcao1.descricao" :rules="opcaoCertoErradoRegra" :counter="6"
                label="Opção Correta" required></v-text-field>
              <v-text-field v-model="opcao2.descricao" :rules="opcaoCertoErradoRegra" :counter="6"
                label="Opção 2" required></v-text-field>
            </div>
            <div v-if="isMultiplaEscolha()">
              <v-textarea label="Opção Correta" required v-model="opcao1.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
              <v-textarea label="Opção 2" required v-model="opcao2.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
              <v-textarea label="Opção 3" required v-model="opcao3.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
              <v-textarea label="Opção 4" required v-model="opcao4.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
              <v-textarea label="Opção 5" required v-model="opcao5.descricao" :rules="opcaoRegra" :counter="500"></v-textarea>
            </div>
            <v-chip color="primary" text-color="white">Obs:</v-chip>
            <vue-editor v-model="questao.observacao"></vue-editor>
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
import { VueEditor } from 'vue2-editor'
import DisciplinaServico from '@/service/DisciplinaServico'
import AssuntoServico from '@/service/AssuntoServico'
import QuestaoServico from '@/service/QuestaoServico'
import TipoQuestao from '../dominio/TipoQuestao'
import Opcao from '../dominio/Opcao'
import Questao from '../dominio/Questao'
import FiltroAssunto from '../dominio/FiltroAssunto'
import MensagemUtil from '@/util/MensagemUtil'
export default {
  name: 'CadastraQuestao',
  components: {
      VueEditor
  },
  data () {
    return {
      labelBtn: 'Cadastrar',
      modal: false,
      questao: new Questao(),
      tiposQuestoes: [
          {text: TipoQuestao.CERTO_ERRADO.label, value: TipoQuestao.CERTO_ERRADO.nome},
          {text: TipoQuestao.MULTIPLA_ESCOLHA.label, value: TipoQuestao.MULTIPLA_ESCOLHA.nome}
      ],
      opcao1: new Opcao('', true),
      opcao2: new Opcao('', false),
      opcao3: new Opcao('', false),
      opcao4: new Opcao('', false),
      opcao5: new Opcao('', false),
      assuntos: [],
      disciplinas: [],
      valid: true,
      assuntoRegra: [
        v => !!v || 'Assunto é obrigatório'
      ],
      disciplinaRegra: [
        v => !!v || 'Disciplina é obrigatório'
      ],
      opcaoRegra: [
        v => !!v || 'Opção é obrigatória',
        v => (v && v.length <= 500) || 'Opção não pode ser mais do que 500 characters'
      ],
      opcaoCertoErradoRegra: [
        v => !!v || 'Opção é obrigatória',
        v => (v && v.length <= 6) || 'Opção não pode ser mais do que 6 characters'
      ],
      tipoQuestaoRegra: [
        v => !!v || 'Tipo Questão é obrigatória'
      ]
    }
  },
  methods: {
    cadastrar () {
      if (this.$refs.form.validate()) {
        if (!this.questao.enunciado) {
          MensagemUtil.erro('Enunciado é obrigatório!')
          return
        }
        this.questao.opcoes.push(this.opcao1)
        this.questao.opcoes.push(this.opcao2)
        if (this.isMultiplaEscolha()) {
          this.questao.opcoes.push(this.opcao3)
          this.questao.opcoes.push(this.opcao4)
          this.questao.opcoes.push(this.opcao5)
        }
        QuestaoServico.salvar(this.questao).then((data) => {
          this.$emit('listarQuestoes')
          this.modal = false
        })
      }
    },
    isCertoErrado () {
      return this.questao.tipoQuestao === TipoQuestao.CERTO_ERRADO.nome
    },
    isMultiplaEscolha () {
      return this.questao.tipoQuestao === TipoQuestao.MULTIPLA_ESCOLHA.nome
    },
    async changedValue (value) {
      this.assuntos = await AssuntoServico.listarCombo(new FiltroAssunto('', value))
    },
    editar (questao) {
      this.questao = questao
      this.opcao1 = new Opcao(questao.opcoes[0].descricao, questao.opcoes[0].correta)
      this.opcao2 = new Opcao(questao.opcoes[1].descricao, questao.opcoes[1].correta)
      if (this.isMultiplaEscolha()) {
        this.opcao3 = new Opcao(questao.opcoes[2].descricao, questao.opcoes[2].correta)
        this.opcao4 = new Opcao(questao.opcoes[3].descricao, questao.opcoes[3].correta)
        this.opcao5 = new Opcao(questao.opcoes[4].descricao, questao.opcoes[4].correta)
      }
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
