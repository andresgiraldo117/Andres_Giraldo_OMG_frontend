<script>

import simplebar from "simplebar-vue";
import { layoutComputed, authFackComputed } from "@/state/helpers";
import bus from "./eventBus";


/**
 * Horizontal-topbar component
 */
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...layoutComputed,
    ...authFackComputed,
  },
  components: {
    simplebar,
  },
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    executeSearchFilter(event) {
      bus.$emit('llamar-search-filter', event);
    },
    openModal() {
      bus.$emit('llamar-open-modal');
    },
    toggleMenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
    setAltImg(event) { 
      event.target.src = require('@/assets/images/avatar_custom.png')
    },
    getImgUrl() {
      if (this.$store.state.authfack.user.imagen) {
        let userImg = this.$store.state.authfack.user.imagen
        return userImg
      } else {
        return require('@/assets/images/avatar_custom.png')
      }
    },
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar", "dark");
              document.body.removeAttribute("data-layout-scrollable");
              break;
            case "light":
              document.body.setAttribute("data-topbar", "light");
              document.body.removeAttribute("data-layout-size", "boxed");
              document.body.removeAttribute("data-layout-scrollable");
              break;
            case "colored":
              document.body.setAttribute("data-topbar", "colored");
              document.body.removeAttribute("data-layout-size", "boxed");
              break;
            default:
              document.body.setAttribute("data-topbar", "dark");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              document.body.removeAttribute("data-layout-scrollable");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-scrollable");
              document.body.removeAttribute("data-layout-size");
              break;
            case "scrollable":
              document.body.setAttribute("data-layout-scrollable", "true");
              document.body.removeAttribute("data-layout-mode");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <button
          id="toggle"
          type="button"
          class="btn btn-sm me-2 font-size-16 d-lg-none header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input @input="executeSearchFilter($event)" type="text" class="form-control" placeholder="Search..." />
            <span class="bx bx-search-alt"></span>
          </div>
        </form>
      </div>
      
      <div class="d-flex align-items-center">
        <div class="px-3">
          <b-button variant="primary" size="sm" class="px-4" @click="openModal">
            <i class="bx bx-plus font-size-16 align-middle me-1"></i>
            NEW
          </b-button>
        </div>
        <b-dropdown
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
          toggle-class="header-item noti-icon"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="bx bx-bell bx-tada"></i>
            <span class="badge bg-danger rounded-pill">1</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">
                  {{ $t("navbar.dropdown.notification.text") }}
                </h6>
              </div>
              <div class="col-auto">
                <a href="#" class="small">{{
                  $t("navbar.dropdown.notification.subtext")
                }}</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px">
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="d-flex">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-primary rounded-circle font-size-16"
                  >
                    <i class="bx bx-cart"></i>
                  </span>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.order.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.order.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.order.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div class="p-2 border-top d-grid">
            <a
              class="btn btn-sm btn-link font-size-14 text-center"
              href="javascript:void(0)"
            >
              <i class="mdi mdi-arrow-right-circle me-1"></i>
              <span key="t-view-more">
                {{ $t("navbar.dropdown.notification.button") }}</span
              >
            </a>
          </div>
        </b-dropdown>

        <b-dropdown right variant="black" toggle-class="header-item">
          <template v-slot:button-content>
            <span class="d-none d-xl-inline-block mx-2">{{
              user.name
            }}</span>
            <img
              class="rounded-circle header-profile-user"
              :src="getImgUrl()"
              @error="setAltImg" 
              alt="Header Avatar"
            />
            <!-- <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i> -->
          </template>
          <!-- item-->
          <a href="/logout" class="dropdown-item text-danger">
            <i
              class="bx bx-power-off font-size-16 align-middle me-1 text-danger"
            ></i>
            {{ $t("navbar.dropdown.henry.list.logout") }}
          </a>
        </b-dropdown>

      </div>
    </div>
  </header>
</template>
