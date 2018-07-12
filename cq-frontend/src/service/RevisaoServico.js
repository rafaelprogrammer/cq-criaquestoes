import axios from 'axios'
import MensagemUtil from '@/util/MensagemUtil'
export default {
    criar (filtro) {
            return axios.post('/revisao', filtro)
            .then(function (response) {
                MensagemUtil.sucesso('Revisão cadastrada')
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar criar Revisão')
                console.error(error)
            })
    },
    atualizar (revisao) {
            return axios.put('/revisao', revisao)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar atualizar Revisão')
                console.error(error)
            })
    },
    editar (revisao) {
        return axios.get('/revisao/' + revisao.id)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar editar Revisão')
            console.error(error)
        })
    },
    remover (revisao) {
        return axios.delete('/revisao/' + revisao.id)
        .then(function (response) {
            MensagemUtil.sucesso('Revisão removida')
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar remover Revisão')
            console.error(error)
        })
    },
    listarTodos () {
        return axios.get('/revisao/listarTodos')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar listar Revisões')
            console.error(error)
        })
    }
}
