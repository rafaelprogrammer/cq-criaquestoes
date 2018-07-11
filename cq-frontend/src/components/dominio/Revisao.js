class Revisao {
    constructor (id, questoes, totalQuestoes, totalAcertos, totalErros, porcentagemAcertos,
                passo, concluido, dataCriacao) {
        this.id = id
        this.questoes = questoes
        this.totalQuestoes = totalQuestoes
        this.totalAcertos = totalAcertos
        this.totalErros = totalErros
        this.porcentagemAcertos = porcentagemAcertos
        this.passo = passo
        this.concluido = concluido
        this.dataCriacao = dataCriacao
    }
}
export default Revisao
