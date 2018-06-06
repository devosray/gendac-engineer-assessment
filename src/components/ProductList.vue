<template>
  <div class="hello">

    <h2>Product List</h2>
    <br/>

    <b-alert v-if="loading" show variant="primary">Fetching products...</b-alert>
    <table v-else class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Price</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <th scope="row">{{product.id}}</th>
        <td>{{product.name}}</td>
        <td>{{product.category}}</td>
        <td>{{product.price}}</td>
        <td>
          <button @click="showModal(product.id)" type="button" class="btn btn-outline-primary">Edit</button>
        </td>
        <td>
          <button type="button" class="btn btn-outline-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <br/>

    <h2>TODO: About Me</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>

    <UpdateProductModal ref="updateModal"/>

  </div>
</template>

<script>
import axios from 'axios'
import UpdateProductModal from './UpdateProductModal'

// Object representing a single item in the database
function Product (obj) {
  this.id = obj.Id
  this.name = obj.Name

  switch (obj.Category) {
    case 1:
      this.category = 'Product Category A'
      break
    case 2:
      this.category = 'Product Category B'
      break
    case 3:
      this.category = 'Product Category C'
      break
    default:
      this.category = 'N/A'
  }

  this.price = obj.Price
}

export default {
  name: 'ProductList',
  components: {UpdateProductModal},
  data () {
    return {
      products: [],
      loading: true
    }
  },

  methods: {
    read () {
      let ref = this
      axios.get('http://gendacproficiencytest.azurewebsites.net/api/ProductsAPI', {responseType: 'json'})
        .then(function (response) {
          response.data.forEach(function (obj) {
            ref.products.push(new Product(obj))
          })
          ref.loading = false
        }).catch(function (error) {
          // todo proper error
          console.log('error: ' + error)
        })
    },

    showModal (productId) {
      const product = this.products.find(prod => prod.id === productId)
      this.$refs.updateModal.show(product)
    }
  },

  created () {
    this.read()
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
