<script lang="ts">
import Swal from "sweetalert2";
import { useClientStore } from "./store/authClientStore";

export default {
  setup() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    return { store: useClientStore(), Toast };
  },
  data() {
    return {
      accData: {
        storeID: "",
      },
    };
  },

  methods: {
    onSubmit() {
      if (this.accData.storeID !== "") {
        this.store.onClientSignIn(this.accData.storeID).then((isAuth) => {
          if (isAuth) {
            this.Toast.fire({
              icon: "success",
              title: "เข้าสูระบบในสถานะ Client เรียบร้อย",
            });
            this.$router.push("/overview");
          } else {
            this.Toast.fire({
              icon: "success",
              title: "ไม่พบข้อมูล โปรดลองอีกครั้ง",
            });
          }
        });
      }
    },
  },
};
</script>
<template>
  <div id="client-login-popup">
    <div
      class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
    >
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <v-card
          elevation="8"
          class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
        ></v-card>
        <v-card
          elevation="1"
          class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
        >
          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold">
                เข้าสู่ระบบสำหรับการจัดการเว็บไซต์
              </h1>
            </div>
            <div class="divide-y divide-gray-200">
              <div
                class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <FormKit type="form" @submit="onSubmit">
                  <div class="relative">
                    <FormKit
                      type="text"
                      validation="required"
                      label="Store ID"
                      help="โปรดกรอกรหัส Store ID ที่คุณได้ลงทะเบียนไว้"
                      v-model="accData.storeID"
                    />
                  </div>
                </FormKit>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
