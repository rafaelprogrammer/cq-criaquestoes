import axios from 'axios'
import MensagemUtil from '@/util/MensagemUtil'
export default {
    salvar (disciplina) {
        if (disciplina.id) {
            return axios.put('/disciplina', disciplina)
            .then(function (response) {
                MensagemUtil.sucesso('Disciplina atualizada - ' + disciplina.nome)
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar atualizar Disciplina')
                console.error(error)
            })
        } else {
            return axios.post('/disciplina', disciplina)
            .then(function (response) {
                MensagemUtil.sucesso('Disciplina cadastrada - ' + disciplina.nome)
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar cadastrar Disciplina')
                console.error(error)
            })
        }
    },
    editar (disciplina) {
        return axios.get('/disciplina/' + disciplina.id)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar editar Disciplina')
            console.error(error)
        })
    },
    remover (disciplina) {
        return axios.delete('/disciplina/' + disciplina.id)
        .then(function (response) {
            MensagemUtil.sucesso('Disciplina removida - ' + disciplina.nome)
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar remover Disciplina')
            console.error(error)
        })
    },
    listarTodos () {
        return axios.get('/disciplina/listar')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar listar Disciplinas')
            console.error(error)
        })
    },
    listarTodosCombo () {
        let disciplinas = []
        return axios.get('/disciplina/listar')
        .then(function (response) {
            for (let i in response.data) {
                disciplinas.push({value: response.data[i].id, text: response.data[i].nome})
            }
            return disciplinas
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar listar Disciplinas')
            console.error(error)
        })
    }
}
