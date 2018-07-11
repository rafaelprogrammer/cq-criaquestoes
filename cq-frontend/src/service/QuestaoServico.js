import axios from 'axios'
import MensagemUtil from '@/util/MensagemUtil'
export default {
    salvar (questao) {
        if (questao.id) {
            return axios.put('/questao', questao)
            .then(function (response) {
                MensagemUtil.sucesso('Questão atualizada - ' + questao.enunciado)
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar atualizar Questão')
                console.error(error)
            })
        } else {
            return axios.post('/questao', questao)
            .then(function (response) {
                MensagemUtil.sucesso('Questão cadastrada - ' + questao.enunciado)
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar cadastrar Questão')
                console.error(error)
            })
        }
    },
    editar (questao) {
        return axios.get('/questao/' + questao.id)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar editar Questão')
            console.error(error)
        })
    },
    remover (questao) {
        return axios.delete('/questao/' + questao.id)
        .then(function (response) {
            MensagemUtil.sucesso('Questão removida - ' + questao.descricao)
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar remover Questão')
            console.error(error)
        })
    },
    listarTodos () {
        return axios.get('/questao/listar')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar listar Questões')
            console.error(error)
        })
    }
}
