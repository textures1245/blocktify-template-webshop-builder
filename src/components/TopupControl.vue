<script lang="ts">
import { toHandlers } from "vue";

export default {
  data() {
    return {
      step: 1,
      formControl: {
        topupType: "TrueMoneyWallet",
        phone: "",
        voucher: "",
      },
    };
  },

  computed: {
    currentTopUpStep() {
      switch (this.step) {
        case 1:
          return "เลือกวิธีชำระเงิน";
        case 2:
          return "กรอกคูปอง";
        default:
          return "Account created";
      }
    },
  },

  methods: {
    stepValidation(step: number) {
      switch (step) {
        case 1:
          return (
            this.formControl.phone.length > 50 &&
            isNaN(this.formControl.phone as any)
          );
      }
    },

    onSubmit() {},
  },
};
</script>
<template>
  <section class="flex flex-col gap-3">
    <div id="topup-title" class="flex gap-2">
      <h1 class="text-lg font-semibold">
        {{ currentTopUpStep }}
      </h1>
      <v-avatar
        class="!bg-primary text-primary-content"
        size="24"
        v-text="step"
      ></v-avatar>
    </div>
    <v-select
      v-model="formControl.topupType"
      label="Select"
      :items="['TrueMoneyWallet']"
      variant="solo"
    >
      <template #prepend-inner>
        <div class="">
          <v-avatar
            image="https://www.truemoney.com/wp-content/uploads/2020/11/logo-truemoneywallet-300x300-1.jpg"
          >
          </v-avatar>
        </div>
      </template>
    </v-select>

    <FormKit type="form" :actions="false">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <FormKit
              v-model="formControl.phone"
              label="โปรดกรอกเบอร์โทรศัพท์ที่ท่านต้องการเติมเงิน"
              type="text"
              placeholder="เบอร์โทรศัพท์"
              validation="required|length:10,0|number"
              :validation-messages="{
                number: 'ต้องเป็นตัวเลขเท่านั้น',
                length: 'ห้ามเกินกว่า 10 หลัก',
                required: 'ตัวกรอกนี้ห้ามว่าง',
              }"
              help="ขั้นต่ำการเติมเงิน 50 บาท"
            ></FormKit>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <div class="flex flex-col gap-4 text-md mb-4">
              <h1>วิธีการแลกคูปอง (Voucher) ของ True Money Wallet</h1>
              <hr />
              <img src="../assets/images/trueMoney_voucher.png" class="" />
              <p class="text-caption text-sm">
                อ้างอิง:
                <a
                  target="_blank"
                  href="https://support.truemoney.com/knowledge-base/how-to-use-coupon/"
                  class="underlined"
                  >https://support.truemoney.com/knowledge-base/how-to-use-coupon/</a
                >
              </p>
            </div>
            <FormKit
              v-model="formControl.voucher"
              label="Voucher"
              type="text"
              placeholder="โปรดกรอก Voucher ของท่าน"
              help="ลักษณะคูปองจะเป็นแบบลิ้ง URL"
              validation="required|url"
            ></FormKit>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn v-if="step > 1" variant="text" @click="step--"> ก่อน</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step == 1"
          class="!btn-secondary"
          variant="flat"
          :disabled="stepValidation(step)"
          @click="step++"
        >
          ไปต่อ
        </v-btn>
        <FormKit v-else type="submit" label="ยืนยันการชำระ"></FormKit>
      </v-card-actions>
    </FormKit>
  </section>
</template>
<style lang="scss"></style>
