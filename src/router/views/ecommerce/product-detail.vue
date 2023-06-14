<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import { todoMethods } from "@/state/helpers";
import PageHeader from "@/components/page-header";
import { clothsData } from "./data-products";

/**
 * Product detail component
 */
export default {
  page: {
    title: "Product Detail",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      productDetail: null,
      clothsData: clothsData,
      title: "",
      items: [
        {
          text: "Products",
          href: "/",
        },
        {
          text: "Product Detail",
          active: true,
        },
      ],
    };
  },
  created() {
    this.getallProductsbyId(this.$route.params.id)
  },
  methods: {
     ...todoMethods,
    getallProductsbyId(id){
      this.fethgetallProductsbyId({
        token: this.$store.state.authfack.user.token,
        id
      }).then(resp => {
        this.productDetail = resp.product
      })
    },
    imageShow(event) {
      const image = event.target.src;
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = image;
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-6">
                <div class="product-detai-imgs">
                  <b-tabs
                    pills
                    vertical
                    nav-wrapper-class="col-md-2 col-sm-3 col-4"
                  >
                    <b-tab>
                      <template v-slot:title>
                        <img
                          :src="productDetail.url_image"
                          alt
                          class="img-fluid mx-auto d-block tab-img rounded"
                        />
                      </template>
                      <div class="product-img">
                        <img
                          :src="productDetail.url_image"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </div>

              <div class="col-xl-6">
                <div class="mt-3">
                  <h4 class="mt-1 mb-3">{{ productDetail.name }}</h4>
                  <p class="text-muted float-left me-3">
                    <span class="bx bx-star" :class="productDetail.rating >= 1 ? 'text-warning' : ''"></span>
                    <span class="bx bx-star ml-1" :class="productDetail.rating >= 1 ? 'text-warning' : ''"></span>
                    <span class="bx bx-star ml-1" :class="productDetail.rating >= 1 ? 'text-warning' : ''"></span>
                    <span class="bx bx-star ml-1" :class="productDetail.rating >= 1 ? 'text-warning' : ''"></span>
                    <span class="bx bx-star ml-1" :class="productDetail.rating >= 1 ? 'text-warning' : ''"></span>
                  </p>

                  <h5 class="mb-4">
                    Price :
                    <b>${{ productDetail.value }} USD</b>
                  </h5>
                  <!-- <p class="text-muted mb-4">
                    To achieve this, it would be necessary to have uniform
                    grammar pronunciation and more common words If several
                    languages coalesce
                  </p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
