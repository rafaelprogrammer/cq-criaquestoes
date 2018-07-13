import Assunto from './Assunto'
import Disciplina from './Disciplina'
import TipoQuestao from './TipoQuestao'
class Questao {
    constructor (id, enunciado, tipoQuestao, opcoes, assunto, disciplina, observacao) {
        this.id = id
        this.enunciado = enunciado
        this.tipoQuestao = TipoQuestao.MULTIPLA_ESCOLHA.nome
        if (!opcoes) {
            this.opcoes = []
        } else {
            this.opcoes = opcoes
        }
        if (!assunto) {
            this.assunto = new Assunto()
        } else {
            this.assunto = assunto
        }
        if (!disciplina) {
            this.disciplina = new Disciplina()
        } else {
            this.disciplina = disciplina
        }
        this.observacao = observacao
    }
}
export default Questao
