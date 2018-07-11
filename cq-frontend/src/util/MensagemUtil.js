import EventBus from './EventBus.js'
export default {
    evento () {
        return 'mensagem'
    },
    sucesso (msg) {
        EventBus.$emit(this.evento(), msg, 'success')
    },
    erro (msg) {
        EventBus.$emit(this.evento(), msg, 'error')
    }
}
