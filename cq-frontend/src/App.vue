<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer" fixed clipped class="grey lighten-4" app>
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-tile v-else :key="i">
            <v-list-tile-content>
                <v-btn flat small :to="item.rota"><v-icon>{{ item.icon }}</v-icon> {{ item.text }}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" app fixed clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">CQ - <span class="text">Cria Questões</span></span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center>
          <v-flex xs12>
            <mensagem-global />
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MensagemGlobal from './components/mensagem/MensagemGlobal'
  export default {
    name: 'App',
    components: {
      MensagemGlobal
    },
    data: () => ({
      drawer: null,
      items: [
        { heading: 'Estudo' },
        // { icon: 'note', text: 'Notas', rota: '' },
        { icon: 'touch_app', text: 'Revisão', rota: '/listaRevisoes' },
        { divider: true },
        { heading: 'Cadastros' },
        { icon: 'add', text: 'Disciplinas', rota: '/listaDisciplinas' },
        { icon: 'add', text: 'Assuntos', rota: '/listaAssuntos' },
        { icon: 'add', text: 'Questões', rota: '/listaQuestoes' },
        // { divider: true },
        // { icon: 'settings', text: 'Configurações' },
        // { icon: 'help', text: 'Ajuda' }
      ]
    })
  }
</script>

<style>
  #keep main .container {
    height: 660px;
  }
  .v-navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>
