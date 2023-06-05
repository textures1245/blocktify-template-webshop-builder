<script lang="ts">
import { doc } from "@firebase/firestore";
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore } from "../configCPNStore";
import Swal from "sweetalert2";
export default {
  components: { CardExpand },
  setup() {
    const store = useConfigComponentStore();
    return {
      store,
      client: store.getWebsiteConfig,
    };
  },

  data() {
    return {
      options: {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    };
  },

  methods: {
    handleIconClick(node: any, e: any) {
      node.props.suffixIcon =
        node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
      node.props.type = node.props.type === "password" ? "text" : "password";
    },

    onClientsPhoneSave(node: any) {
      this.store.saveClientsPhone(node.phone).then((res) => {
        Swal.fire({
          icon: res.status,
          text: res.msg,
        });
      });
    },
  },
};
</script>
<template>
  <div>
    <CardExpand headline="ลายละเอียดโดเมน">
      <template #content>
        <div id="domain-expired-date">
          <article class="prose-sm">
            <h3>วันหมดอายุโดเมน</h3>
            <p class="font-bold">
              {{
                client!.domainExpiredDate.toLocaleDateString(
                  "th-TH",
                  options as any
                )
              }}
            </p>
            <p class="text-xs text-error">
              โปรดจำไว้ว่า
              เว็บไซต์โดเมนของคุณจะถูกระงับการใช้งานเมื่อเลยวันหมดอายุโดยอัตโนมัติ
              ดั้งนั้นโปรดชำระค่าบริการก่อนถึงวันหมดอายุ
            </p>
          </article>
        </div>
      </template>
    </CardExpand>
    <CardExpand headline="เบอร์โทรศัพท์">
      <template #content>
        <div class="flex flex-col gap-4">
          <h1>สำหรับไว้ใช้ในการทำธุรกรรม โปรดกรุณากรอก</h1>
          <FormKit @submit="onClientsPhoneSave" type="form">
            <FormKit
              v-model="client!.phone"
              label="โปรดกรอกเบอร์"
              type="password"
              name="phone"
              placeholder="เบอร์โทรศัพท์"
              validation="required|length:10,10|number"
              suffix-icon="eyeClosed"
              prefix-icon="telephone"
              @suffix-icon-click="handleIconClick"
              :validation-messages="{
                number: 'ต้องเป็นตัวเลขเท่านั้น',
                length: 'ห้ามเกินกว่าหรือน้อยกว่า 10 หลัก',
                required: 'ตัวกรอกนี้ห้ามว่าง',
              }"
            ></FormKit>
          </FormKit>
        </div>
      </template>
    </CardExpand>
  </div>
</template>
<style lang="scss">
.formkit-suffix-icon:hover {
  color: var(--fk-color-primary);
}
</style>
