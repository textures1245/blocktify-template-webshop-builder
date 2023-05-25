<script lang="ts">
import Swal from "sweetalert2";
import FormData from "form-data";
import axios from "axios";
import { useConfigComponentStore } from "../configCPNStore";
import { useTransactionStore } from "../../store/product/transationStore";

export default {
  setup() {
    const configStore = useConfigComponentStore();
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

    const data = new FormData();
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_TRUEWALLET_VOUCHER_TOUUP,
      headers: {
        ...data.getHeaders,
        storeID: configStore.getWebsiteConfig.storeID,
      },
      data,
    };
    return {
      Toast,
      config,
      client: configStore.getWebsiteConfig,
      data,
      transactionStore: useTransactionStore(),
    };
  },

  mounted() {
    let { phone, isNull } = this.validPlayerPhone();
    this.formControl.phone = phone;
    this.skipPhoneStep = isNull;
  },

  data() {
    return {
      step: 1,
      skipPhoneStep: false,
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
    validPlayerPhone() {
      if (this.client.phone === null) {
        return { phone: "", isNull: true };
      }
      return { phone: this.client.phone, isNull: false };
    },

    stepValidation(step: number) {
      switch (step) {
        case 1:
          return (
            this.formControl.phone.length > 10 ||
            /^\d+$/.test(this.formControl.phone) === false
          );
      }
    },

    onSubmit() {
      if (this.formControl.phone === "" || this.formControl.voucher === "") {
        return alert("กรุณากรอกข้อมูลให้ครบ");
      }

      this.data.append("phone", this.formControl.phone);
      this.data.append("phone", this.formControl.voucher);

      axios(this.config)
        .then(async (response) => {
          this.Toast.fire("คุณได้เติมเงินเป็นที่เรียบร้อยแล้ว", "", "success");
          await this.transactionStore.onFetchTopUpTransactionList();
        })
        .catch(
          (err) => (
            this.Toast.fire(
              "ไม่สามารถทำการเติมเงินได้ ",
              "โปรดตรวจสอบให้แน่ใจว่าคุณได้กรอกข้อมูลถูกต้อง",
              "error"
            ),
            console.error(err)
          )
        );

      //- clear data properties
      this.data = new FormData();
    },
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
        <!--! unused code -->
        <!-- <v-window-item :value="1">
          <v-card-text v-if="skipPhoneStep">
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
        </v-window-item> -->

        <v-window-item :value="1">
          <v-card-text>
            <div class="flex flex-col gap-4 text-md mb-4">
              <h1>วิธีการแลกคูปอง (Voucher) ของ True Money Wallet</h1>
              <hr />
              <img src="./../../assets/images/trueMoney_voucher.png" class="" />
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
              :validation-messages="{
                required: 'ตัวกรอกนี้ห้ามว่าง',
                url: 'ลักษณะต้องเป็น URL เท่านั้น',
              }"
            ></FormKit>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>

      <v-card-actions>
        <!-- <v-btn v-if="step > 1" variant="text" @click="step--"> ก่อน</v-btn> -->
        <v-spacer></v-spacer>
        <!-- <v-btn
          v-if="step == 1"
          class="!btn-secondary"
          variant="flat"
          :disabled="stepValidation(step)"
          @click="step++"
        >
          ไปต่อ
        </v-btn> -->
        <FormKit type="submit" label="ยืนยันการชำระ"></FormKit>
      </v-card-actions>
    </FormKit>
  </section>
</template>
<style lang="scss"></style>
