<template>
  <div>

    <h2>Product List</h2>
    <br/>

    <b-alert v-if="error" show variant="danger">{{errorMessage}}</b-alert>

    <b-alert :show="showInfoAlert" variant="info" dismissible>{{infoAlertMessage}}</b-alert>

    <b-alert v-if="loading" show variant="primary">Fetching products...</b-alert>
    <table v-else class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Price</th>
        <th scope="col"></th>
        <th scope="col"><button @click="createProduct" type="button" class="btn btn-outline-success">Create Product</button></th>
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
          <button @click="deleteProduct(product.id)" type="button" class="btn btn-outline-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <br/>

    <UpdateProductModal ref="updateModal"/>
    <CreateProductModal ref="createModal" @productCreated="showInfoMessage('New product created.')"/>

  </div>
</template>

<script>
import axios from 'axios'
import UpdateProductModal from './UpdateProductModal'
import CreateProductModal from './CreateProductModal'

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
  components: {CreateProductModal, UpdateProductModal},
  data () {
    return {
      products: [],
      loading: true,
      error: false,
      errorMessage: '',

      showInfoAlert: false,
      infoAlertMessage: ''
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
          ref.error = true
          ref.errorMessage = 'Error while fetching products: ' + error
        })
    },

    deleteProduct (id) {
      const shouldDelete = confirm('Are you sure you want to delete this product?')
      let ref = this
      if (shouldDelete) {
        axios.delete('http://gendacproficiencytest.azurewebsites.net/api/ProductsAPI/' + id)
          .then(function (response) {
            let index = ref.products.findIndex(prod => prod.id === id)
            ref.products.splice(index, 1)
          })
          .catch(function (error) {
            ref.error = true
            ref.errorMessage = 'Error while deleting product: ' + error
          })
      }
    },

    createProduct () {
      this.$refs.createModal.show()
    },

    showModal (productId) {
      const product = this.products.find(prod => prod.id === productId)
      this.$refs.updateModal.show(product)
    },

    showInfoMessage (message) {
      this.showInfoAlert = true
      this.infoAlertMessage = message
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
