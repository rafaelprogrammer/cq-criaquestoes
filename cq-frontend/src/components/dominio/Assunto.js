import Disciplina from './Disciplina'
class Assunto {
    constructor (id, descricao, disciplina) {
        this.id = id
        this.descricao = descricao
        if (disciplina) {
            this.disciplina = disciplina
        } else {
            this.disciplina = new Disciplina()
        }
    }
}
export default Assunto
