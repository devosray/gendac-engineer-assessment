<template>
  <b-modal ref="modal" id="productUpdateModal" title="Update Product" @ok="ok">
    <form>
      <div class="form-group">
        <label for="nameInput">Name</label>
        <input type="text" class="form-control" id="nameInput" v-model="updatedProduct.name">
      </div>
      <!--<div class="form-group">-->
      <!--<label for="exampleInputPassword1">Category</label>-->
      <!--<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">-->
      <!--</div>-->
      <div class="form-group">
        <label for="nameInput">Price</label>
        <input type="text" class="form-control" id="priceInput" v-model="updatedProduct.price">
      </div>
    </form>

    <b-alert v-if="busy" show variant="primary">Updating...</b-alert>
    <b-alert v-if="error" show variant="danger">{{errorMessage}}</b-alert>

  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateProductModal',

  data () {
    return {
      productRef: {},
      updatedProduct: {},
      busy: false,
      error: false,
      errorMessage: ''
    }
  },

  methods: {
    show (product) {
      this.productRef = product
      this.updatedProduct = Object.assign({}, product)
      this.error = false
      this.busy = false
      this.$refs.modal.show()
    },

    ok (event) {
      // Submit update request
      event.cancel()
      this.error = false
      this.busy = true
      const ref = this
      axios.put('http://gendacproficiencytest.azurewebsites.net/api/ProductsAPI/' + this.productRef.id, {
        Id: ref.productRef.id,
        Name: ref.updatedProduct.name,
        Category: ref.updatedProduct.category,
        Price: ref.updatedProduct.price
      })
        .then(function (response) {
          console.log(response.data)
          ref.productRef = ref.updatedProduct
        }).catch(function (error) {
          ref.error = true
          ref.errorMessage = 'Error updating product: ' + error.response.data.Message
          console.log()
        }).finally(function () {
          ref.busy = false
        })
    }
  }
}
</script>

<style scoped>

</style>
