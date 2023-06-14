<script>
import HorizontalTopbar from "@/components/horizontal-topbar";
import Footer from "@/components/footer";
import { layoutComputed } from "@/state/helpers";
/**
 * Horizontal-layout
 */
export default {
  props: {},
  components: {
    HorizontalTopbar,
    Footer,
  },
  data() {
    return {};
  },
  computed: {
    ...layoutComputed,
  },
  created: () => {
    document.body.setAttribute("data-layout", "horizontal");
    document.body.setAttribute("data-topbar", "dark");
    document.body.removeAttribute("data-sidebar");
    document.body.removeAttribute("data-layout-size");
    document.body.classList.remove("auth-body-bg");
  },
  methods: {
  },
  mounted() {
    if (this.loader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function() {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
  },
};
</script>

<template>
  <div>
    <div id="preloader">
      <div id="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <div id="layout-wrapper">
      <HorizontalTopbar :type="topbar" :width="layoutWidth" />
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <slot />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
