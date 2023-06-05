<script lang="ts">
//@ts-nocheck
import axios from "axios";
import FormData from "form-data";
import { HmacSHA256 } from "crypto-js";

export default {
  setup() {
    var data = new FormData();

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_CLIENT_GEN_KEY_API,
      headers: {
        ...data.getHeaders,
      },
      data: data,
    };
    return {
      config,
      data,
    };
  },
  methods: {
    onGenStoreId(data: {
      storeID: string;
      expireDate: string;
      hostName: string;
    }) {
      const secretKey = import.meta.env.VITE_HASH_STORE_ID_SECRET_KEY;
      // Create a HMAC instance with the secret key
      const hashedStoreId = HmacSHA256(data?.storeID, secretKey).toString();
      data.storeID = hashedStoreId;
      for (const [key, value] of Object.entries(data)) {
        this.data.append(key, value);
      }

      axios(this.config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<template>
  <FormKit type="form" :actions="false" @submit="onGenStoreId">
    <div class="grid place-self-center h-screen">
      <div class="flex flex-col items-center justify-center">
        <FormKit name="storeID" label="storeID" type="text"></FormKit>
        <FormKit name="expireDate" label="expiredDate" type="text"></FormKit>
        <FormKit name="hostName" label="hostName" type="text"></FormKit>
        <FormKit type="submit"></FormKit>
      </div>
    </div>
  </FormKit>
</template>
<style lang="scss"></style>
