<template>
  <b-modal ref="modal" id="createProductModal" title="Update Product" @ok="ok">
    <form>
      <div class="form-group">
        <label for="nameInputCreate">Name</label>
        <input type="text" class="form-control" id="nameInputCreate" v-model="newProduct.name">
      </div>
      <div class="form-group">
      <label for="categoryInputCreate">Category</label>
      <input type="number" class="form-control" id="categoryInputCreate" v-model="newProduct.category">
      </div>
      <div class="form-group">
        <label for="priceInputCreate">Price</label>
        <input type="number" class="form-control" id="priceInputCreate" v-model="newProduct.price">
      </div>
    </form>

    <b-alert v-if="busy" show variant="primary">Creating...</b-alert>
    <b-alert v-if="error" show variant="danger">{{errorMessage}}</b-alert>

  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateProductModal',

  data () {
    return {
      newProduct: {},
      busy: false,
      error: false,
      errorMessage: ''
    }
  },

  methods: {
    show () {
      this.newProduct = {
        id: -1,
        name: '',
        price: 0.0,
        category: 1
      }

      this.$refs.modal.show()
    },

    reset () {
      this.error = false
      this.busy = false
    },

    ok (event) {
      // Submit update request
      event.preventDefault()
      this.error = false
      this.busy = true
      const ref = this
      axios.post('http://gendacproficiencytest.azurewebsites.net/api/ProductsAPI/', {
        Id: ref.newProduct.id,
        Name: ref.newProduct.name,
        Category: ref.newProduct.category,
        Price: ref.newProduct.price
      })
        .then(function (response) {
          ref.productRef = ref.newProduct
          ref.$refs.modal.hide()
          ref.$emit('productCreated')
        }).catch(function (error) {
          ref.error = true
          ref.errorMessage = 'Error creating product: ' + error.response.data.Message
        }).finally(function () {
          ref.busy = false
        })
    }
  }
}
</script>

<style scoped>

</style>
