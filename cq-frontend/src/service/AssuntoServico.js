import axios from 'axios'
import MensagemUtil from '@/util/MensagemUtil'
export default {
    salvar (assunto) {
        if (assunto.id) {
            return axios.put('/assunto', assunto)
            .then(function (response) {
                MensagemUtil.sucesso('Assunto atualizado - ' + assunto.descricao)
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar atualizar Assunto')
                console.error(error)
            })
        } else {
            return axios.post('/assunto', assunto)
            .then(function (response) {
                MensagemUtil.sucesso('Assunto cadastrado - ' + assunto.descricao)
                return response.data
            })
            .catch(function (error) {
                MensagemUtil.erro('Erro ao tentar cadastrar Assunto')
                console.error(error)
            })
        }
    },
    editar (assunto) {
        return axios.get('/assunto/' + assunto.id)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar editar Assunto')
            console.error(error)
        })
    },
    remover (assunto) {
        return axios.delete('/assunto/' + assunto.id)
        .then(function (response) {
            MensagemUtil.sucesso('Assunto removido - ' + assunto.descricao)
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar remover Assunto')
            console.error(error)
        })
    },
    listarTodos () {
        return axios.get('/assunto/listarTodos')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar listar Assuntos')
            console.error(error)
        })
    },
    listarCombo (filtroAssunto) {
        let assuntos = []
        return axios.post('/assunto/listar', filtroAssunto)
        .then(function (response) {
            for (let i in response.data) {
                assuntos.push({value: response.data[i].id, text: response.data[i].descricao})
            }
            return assuntos
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar listar Assuntos')
            console.error(error)
        })
    },
    listarTodosCombo () {
        let assuntos = []
        return axios.get('/assunto/listarTodos')
        .then(function (response) {
            for (let i in response.data) {
                assuntos.push({value: response.data[i].id, text: response.data[i].descricao})
            }
            return assuntos
        })
        .catch(function (error) {
            MensagemUtil.erro('Erro ao tentar listar Assuntos')
            console.error(error)
        })
    }
}
