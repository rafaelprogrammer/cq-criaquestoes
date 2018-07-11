<template>
  <div class="paginaPrincipal">
  <v-flex xs12 sm6 offset-sm3>
    <h1>{{ msg }}</h1>
  </v-flex>
  </div>
</template>

<script>
export default {
  name: 'PaginaPrincipal',
  data () {
    return {
      msg: 'Bem-vindo ao CQ - Cria Questões'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
