<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
import { useAuthPlayerStore } from "../auth/store/authPlayerStore";
import Swal from "sweetalert2";
export default {
  setup() {
    const store = useConfigComponentStore();
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

    return {
      appBarConfig: store.AppBarConfig,
      loginConfig: store.getPlayerLoginConfig,
      auth: useAuthPlayerStore(),
      Toast,
    };
  },

  methods: {
    onLogin(data: { playerName: string; playerPassword: string }) {
      this.auth
        .onPlayerAuthenticate(data.playerName, data.playerPassword)
        .then((res) => {
          if (res.status === 400 || res.status === 500) {
            this.Toast.fire({
              icon: "warning",
              title: res.msg,
            });
          } else if (res.status === 408) {
            this.Toast.fire({
              icon: "error",
              title: res.msg,
            });
          } else {
            this.Toast.fire({
              icon: "success",
              title: res.msg,
            });
            this.$router.push("/app/overview");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<template>
  <section id="player-login">
    <img
      src="https://cdn.dribbble.com/users/966188/screenshots/15283925/media/8b8663dc8f6e6a2fd80a201aec1ffbb6.jpg?compress=1&resize=400x300"
      class="h-full visible md:invisible blur absolute z-10 w-full"
    />
    <div
      :class="[
        'w-full h-screen grid md:grid-cols-2 md:!bg-gradient-to-r md:from-primary',,
      ]"
    >
      <v-img
        src="https://cdn.dribbble.com/users/966188/screenshots/15283925/media/8b8663dc8f6e6a2fd80a201aec1ffbb6.jpg?compress=1&resize=400x300"
        cover
        :class="[
          loginConfig.extraClass.loginPosition,
          ,
          'blur-sm hidden md:block z-100',
        ]"
      ></v-img>
      <div class="grid place-self-center">
        <v-card elevation="2" class="w-screen sm:!w-[450px] py-10 z-10">
          <v-card-title id="header" class="flex flex-col gap-8 items-center">
            <v-avatar size="84" :image="appBarConfig.brandImg"> </v-avatar>
            <h1 class="text-2xl font-bold">ลงชื่อเพื่อเข้าใช้ระบบ</h1>
          </v-card-title>
          <v-card-text class="mx-auto w-80">
            <FormKit
              :validation-messages="{
                incomplete: 'ตัวกรอกนี้ไม่สามารถเว้นวรรคได้',
              }"
              @submit="onLogin"
              messages-class="text-center"
              type="form"
              :actions="false"
            >
              <FormKit
                inner-class="w-full"
                name="playerName"
                type="text"
                validation="required"
                :validation-messages="{
                  required: 'ตัวกรอกนี้ไม่สามารถเว้นวรรคได้',
                }"
                label="Username"
              ></FormKit>
              <FormKit
                inner-class="w-full"
                type="password"
                validation="required"
                name="playerPassword"
                label="Password"
                :validation-messages="{
                  required: 'ตัวกรอกนี้ไม่สามารถเว้นวรรคได้',
                }"
              ></FormKit>
              <div class="flex items-center justify-center">
                <FormKit
                  messages-class="text-center"
                  input-class="!btn-primary"
                  type="submit"
                  label="ลงชื่อเข้าใช้"
                ></FormKit>
              </div>
            </FormKit>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </section>
</template>
<style lang="scss"></style>
