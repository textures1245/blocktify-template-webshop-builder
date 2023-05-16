<script lang="ts">
import axios from "axios";
import FormData from "form-data";

export default {
  setup() {
    var data = new FormData();

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://lab.codename-t.com/staff/genkey",
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
    onGenStoreId(data: object) {
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
