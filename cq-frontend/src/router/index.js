import Vue from 'vue'
import Router from 'vue-router'
import PaginaPrincipal from '@/components/PaginaPrincipal'
import ListaDisciplinas from '@/components/cadastros/ListaDisciplinas'
import ListaAssuntos from '@/components/cadastros/ListaAssuntos'
import ListaQuestoes from '@/components/cadastros/ListaQuestoes'
import ListaRevisoes from '@/components/cadastros/ListaRevisoes'
import Revisao from '@/components/cadastros/Revisao'
import Login from '@/components/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PaginaPrincipal',
      component: PaginaPrincipal
    },
    {
      path: '/listaDisciplinas',
      name: 'ListaDisciplinas',
      component: ListaDisciplinas
    },
    {
      path: '/listaAssuntos',
      name: 'ListaAssuntos',
      component: ListaAssuntos
    },
    {
      path: '/listaQuestoes',
      name: 'ListaQuestoes',
      component: ListaQuestoes
    },
    {
      path: '/listaRevisoes',
      name: 'ListaRevisoes',
      component: ListaRevisoes
    },
    {
      path: '/revisao/:id',
      name: 'Revisao',
      component: Revisao
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
