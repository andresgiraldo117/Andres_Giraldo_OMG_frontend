<script>

import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import bus from "../../../components/eventBus";
import { todoMethods } from "@/state/helpers";
import Swal from "sweetalert2";

/**
 * Products component
 */
export default {
  page: {
    title: "Product",
    ref: "productsComponent",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      title: "Product",
      items: [],
      sliderPrice: 800,
      currentPage: 1,
      discountRates: [],
      dataAll: [],
      showModal: false,
      btnedit: false,
      formProduct: {},
    };
  },
  created() {
    this.$refs.productsComponent = this;
  },
  mounted() {
    bus.$on('llamar-search-filter', this.searchFilter);
    bus.$on('llamar-open-modal', this.openModal);
    this.getallProducts()
  },
  methods: {
    ...todoMethods,

    openModal() {
      this.showModal = true
    },
    onFileChange(e) {
      const selectedfile = e.target.files[0];

      const reader = new FileReader()
      let rawImg;
      reader.onloadend = () => {
          rawImg = reader.result.replace("data:", "").replace(/^.+,/, "");
          this.formProduct.mediaUpload = rawImg
      }
      reader.readAsDataURL(selectedfile);
    },
    handleSubmit() {
      if(this.btnedit){
        let data = {
          name: this.formProduct.name,
          value: this.formProduct.value,
          rating: this.formProduct.rating,
        };
        this.fethupdateProduct({
          token: this.$store.state.authfack.user.token,
          data,
          id: this.formProduct._id
          // eslint-disable-next-line no-unused-vars
        }).then(resp => {
          if(resp.status === 200){
            this.getallProducts()
            Swal.fire("Good job!", 'Update success', "success");
          }
          this.resetModal()
        })
      }else{
        let data = {
          id_user: this.$store.state.authfack.user._id,
          name: this.formProduct.name,
          value: this.formProduct.value,
          rating: this.formProduct.rating,
          url_image: 'data:image/jpeg;base64,' + this.formProduct.mediaUpload
        };
        this.fethRegisterProduct({
          token: this.$store.state.authfack.user.token,
          data,
        }).then(resp => {
          this.showModal = false
          this.formProduct.name = null
          this.formProduct.value = null
          this.formProduct.rating = null
          this.formProduct.mediaUpload = null
          this.getallProducts()
          Swal.fire("Good job!", resp.message, "success");
        })
      }
    },
    editProduct(product) {
      this.btnedit = true

      this.showModal = true
      this.formProduct.name = product.name
      this.formProduct.value = product.value
      this.formProduct.rating = product.rating
      this.formProduct._id = product._id
    },
    resetModal(){
      // eslint-disable-next-line no-console
      console.log('reset')
      this.btnedit = false
      this.showModal = false
      this.formProduct.name = null
      this.formProduct.value = null
      this.formProduct.rating = null
      this.formProduct.mediaUpload = null
      this.formProduct._id = null
    },
    deleteProduct(id) {
      this.fethdeleteProduct({
        token: this.$store.state.authfack.user.token,
        id
        // eslint-disable-next-line no-unused-vars
      }).then(resp => {
        if (resp.status === 200) {
          Swal.fire("Good job!", "Delete success", "success");
        }
        this.getallProducts()
      })
    },
    getallProducts() {
      this.fethgetallProducts({
        token: this.$store.state.authfack.user.token,
      }).then(resp => {
        this.dataAll = resp.products
      })
    },
    searchFilter(e) {
      const searchStr = e.target.value;
      this.clothsData = this.dataAll.filter((product) => {
        return (
          product.name.toLowerCase().search(searchStr.toLowerCase()) !== -1
        );
      });
    },
  },
};
</script>

<template>
  <Layout>
    <b-modal title="Add Task" v-model="showModal" @hidden="resetModal" hide-footer>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="name">Name</label>
              <input id="name" v-model="formProduct.name" type="text" class="form-control" placeholder="Insert name" />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="name">Value</label>
              <input id="name" v-model="formProduct.value" min="1" max="99999999"  type="number" class="form-control"
                placeholder="Insert value" />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="name">Rating</label>
              <input id="name" v-model="formProduct.rating" min="1" max="5" type="number" class="form-control"
                placeholder="Insert rating" />
            </div>
          </div>
          <div class="mb-3">
            <label for="file">File</label>
            <input id="file" type="file" multiple class="form-control" @change="onFileChange($event)" />
          </div>
        </div>
        <div class="text-end mt-3">
          <b-button variant="danger" @click="resetModal">Ccancel</b-button>
          <b-button type="submit" variant="success" class="ms-1">{{ btnedit ? 'Update product' : 'Create product' }}</b-button>
        </div>
      </form>
    </b-modal>
    <div class="row">
      <div class="col-lg-12">
        <div class="row mb-3">
          <div class="col-lg-8 col-sm-6">
            <!-- <form class="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
              <div class="search-box me-2">
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control border-0"
                    placeholder="Search..."
                    @input="searchFilter($event)"
                  />
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </form> -->
          </div>
        </div>
        <div class="row">
          <div v-for="data in dataAll" :key="data._id" class="col-xl-2 col-sm-6">
            <router-link :to="`/ecommerce/product-detail/${data._id}`">
              <b-card :img-src="data.url_image" img-alt="Card image" img-top body-class="p-2" img-height="150">
                <div>
                  <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-3 text-truncate">
                      <router-link class="text-dark" :to="`/ecommerce/product-detail/${data.id}`">{{ data.name
                      }}</router-link>
                    </h5>
                    <b-dropdown variant="white" toggle-class="text-muted p-0" toggle-tag="div">
                      <template v-slot:button-content>
                        <i class="mdi mdi-dots-vertical  font-size-18"></i>
                      </template>
                      <b-dropdown-item @click="editProduct(data)">Edit</b-dropdown-item>
                      <b-dropdown-item @click="deleteProduct(data._id)">Delete</b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <h5 class="my-0 mb-2">
                    <b>${{ data.value }}</b>
                  </h5>
                  <div class="d-flex justify-content-between">
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.order.time") }}
                    </p>
                    <p class="text-muted">
                      <i class="bx bxs-star" :class="data.rating >= 1 ? 'text-warning' : ''"></i>
                      <i class="bx bxs-star" :class="data.rating >= 2 ? 'text-warning' : ''"></i>
                      <i class="bx bxs-star" :class="data.rating >= 3 ? 'text-warning' : ''"></i>
                      <i class="bx bxs-star" :class="data.rating >= 4 ? 'text-warning' : ''"></i>
                      <i class="bx bxs-star" :class="data.rating >= 5 ? 'text-warning' : ''"></i>
                    </p>
                  </div>
                </div>
              </b-card>
            </router-link>
          </div>
          <div v-if="dataAll.length === 0" class="d-flex justify-content-center align-items-center">
            <span>Not products, please add nes projects</span>
          </div>
        </div>
        <!-- end row -->
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
