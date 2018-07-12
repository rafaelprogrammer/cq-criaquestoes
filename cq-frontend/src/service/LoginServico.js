import axios from 'axios'
import MensagemUtil from '@/util/MensagemUtil'
export default {
    logar (login) {
        return axios.post('/cp/auth', login)
        .then(function (response) {
            return response.data.token
        })
        .catch(function (error) {
            MensagemUtil.erro('Usuário ou Senha inválidos')
            console.error(error)
        })
    }
}
