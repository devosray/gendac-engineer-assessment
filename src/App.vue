<template>
  <div>
    <Navbar/>

    <b-container id="app">
      <router-view/>

      <h2>About me:</h2>
      <ul>
        <li>
          <a
            href="https://github.com/devosray"
            target="_blank"
          >
            GitHub (@devosray)
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/raymond-de-vos-za/"
            target="_blank"
          >
            Raymond de Vos (LinkedIn)
          </a>
        </li>
      </ul>
    </b-container>

  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {Navbar}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

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
