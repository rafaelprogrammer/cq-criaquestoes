import Assunto from './Assunto'
import TipoQuestao from './TipoQuestao'
class Questao {
    constructor (id, enunciado, tipoQuestao, opcoes, assunto, observacao) {
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
        this.observacao = observacao
    }
}
export default Questao
