<script>
import {
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";
import { mapState } from "vuex";

import appConfig from "@/app.config";
import { required, email } from "vuelidate/lib/validators";

/**
 * Login-2 component
 */
export default {
  page: {
    title: "Login 2",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      email: "andreesgiraldo117@gmail.com",
      password: "123456",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...authFackMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
          const { email, password } = this;
          if (email && password) {
            this.login({
              email,
              password,
            });
          }
        }
      }
    },
  },
  mounted() {
    document.body.classList.add("auth-body-bg");
  },
};
</script>

<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-xl-3">
          <div class="mb-4 mb-md-5 position-absolute p-3">
            <router-link to="/" class="d-block auth-logo">
              <h2 class="text-white d-none d-lg-block">LOGO</h2>
            </router-link>
          </div>
          <div class="auth-full-bg pt-lg-5 p-4">
            <div class="w-100">
              <div class="d-flex h-100 flex-column justify-content-center">
                <div class="p-2">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="">
                        <h1 class="mb-3 text-white">
                          ¡Welcome! <p> Sign to start </p>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end col -->

        <div class="col-xl-9">
          <div class="auth-full-page-content p-md-5 p-4">
            <div class="w-100">
              <div class="d-flex flex-column h-100">
                <div class="my-auto w-50 m-auto">
                  <div>
                    <h4 class="">Enter your credentials !</h4>
                  </div>
                  <b-alert
                    v-model="isAuthError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                    >{{ authError }}</b-alert
                  >

                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>
                  <div class="mt-4">
                    <form @submit.prevent="tryToLogIn">
                      <b-form-group
                        class="mb-3"
                        id="input-group-1"
                        label="Email Address"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="email"
                          type="text"
                          placeholder="yourname@gmail.com"
                          :class="{
                            'is-invalid': submitted && $v.email.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-if="submitted && $v.email.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.email.required"
                            >Email is required.</span
                          >
                          <span v-if="!$v.email.email"
                            >Please enter valid email.</span
                          >
                        </div>
                      </b-form-group>

                      <b-form-group
                        class="mb-3"
                        id="input-group-2"
                        label="Password"
                        label-for="input-2"
                      >
                        <b-form-input
                          id="input-2"
                          v-model="password"
                          type="password"
                          placeholder="smallTiger21"
                          :class="{
                            'is-invalid': submitted && $v.password.$error,
                          }"
                        ></b-form-input>
                        <div
                          v-if="submitted && !$v.password.required"
                          class="invalid-feedback"
                        >
                          Password is required.
                        </div>
                      </b-form-group>
                      <div class="mt-4 text-end">
                        <router-link to="/forgot-password" class="text-primary">
                          <i class="mdi mdi-lock me-1"></i> Forgot your password?
                        </router-link>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="remember-check"
                        />
                        <label class="form-check-label" for="remember-check">
                          Keep me signed in
                        </label>
                      </div>

                      <div class="mt-3 d-grid">
                        <b-button type="submit" variant="primary"
                          >LOGIN</b-button
                        >
                      </div>
                    </form>
                    <div class="mt-2">
                      <p>
                        Not a member? Sign up
                        <router-link
                          to="/register"
                          class="fw-medium text-primary"
                        >
                          Sign up
                        </router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container-fluid -->
  </div>
</template>

<style lang="scss" scoped>
::v-deep .carousel-caption {
  position: relative !important;
  right: 0;
  bottom: 1.25rem;
  left: 0;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  color: #495057;
  text-align: center;
}

::v-deep .carousel-indicators li {
  background-color: rgba(85, 110, 230, 0.25);
}
</style>