<script>
import {
  authFackMethods,
  notificationMethods,
} from "@/state/helpers";
import Layout from "../../layouts/auth";
import appConfig from "@/app.config";
import { mapState } from "vuex";

import { required, email } from "vuelidate/lib/validators";

/**
 * Register component
 */
export default {
  page: {
    title: "Register",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      user: {
        name: "",
        identification_number: "",
        phone: "",
        email: "",
        password: "",
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
    };
  },
  validations: {
    user: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      identification_number: {
        required,
      },
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

    tryToRegisterIn() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
          const { email, name, identification_number, password } = this.user;
          if (email && name && password && identification_number) {
            this.registeruser(this.user);
          }
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Free Register</h5>
                  <p>Get your free OMG account now.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                  src="@/assets/images/profile-img.png"
                  alt
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">

            <b-alert
              v-model="registerSuccess"
              class="mt-3"
              variant="success"
              dismissible
              >Registration successfull.</b-alert
            >

            <b-alert
              v-model="isRegisterError"
              class="mt-3"
              variant="danger"
              dismissible
              >{{ regError }}</b-alert
            >

            <div
              v-if="notification.message"
              :class="'alert ' + notification.type"
            >
              {{ notification.message }}
            </div>

            <b-form class="p-2" @submit.prevent="tryToRegisterIn">
              <b-form-group
              class="mb-3"
                id="email-group"
                label="Name"
                label-for="name"
              >
                <b-form-input
                  id="name"
                  v-model="user.name"
                  type="text"
                  placeholder="Enter name"
                  :class="{
                    'is-invalid': submitted && $v.user.name.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.user.name.required"
                  class="invalid-feedback"
                >
                  Username is required.
                </div>
              </b-form-group>

              <b-form-group
              class="mb-3"
                id="email-group"
                label="Identification number"
                label-for="identification_number"
              >
                <b-form-input
                  id="identification_number"
                  v-model="user.identification_number"
                  type="text"
                  placeholder="Enter identification_number"
                  :class="{
                    'is-invalid': submitted && $v.user.identification_number.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.user.identification_number.required"
                  class="invalid-feedback"
                >
                  Identification number is required.
                </div>
              </b-form-group>

              <b-form-group class="mb-3" id="fullname-group" label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="user.email"
                  type="email"
                  placeholder="Enter email"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                ></b-form-input>
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required.</span>
                  <span v-if="!$v.user.email.email"
                    >Please enter valid email.</span
                  >
                </div>
              </b-form-group>

              <b-form-group class="mb-3" id="fullname-group" label="Phone" label-for="phone">
                <b-form-input
                  id="phone"
                  v-model="user.phone"
                  type="text"
                  placeholder="Enter phone"
                ></b-form-input>
              </b-form-group>

              <b-form-group
              class="mb-3"
                id="password-group"
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  v-model="user.password"
                  type="password"
                  placeholder="Enter password"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.user.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </b-form-group>

              <div class="mt-4 d-grid">
                <b-button type="submit" variant="primary" class="btn-block"
                  >Register</b-button
                >
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Already have an account ?
            <router-link
              to="/login"
              class="fw-medium text-primary"
              >Login</router-link
            >
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>