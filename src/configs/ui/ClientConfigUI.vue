<script lang="ts">
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore } from "../configCPNStore";
export default {
  components: { CardExpand },
  setup() {
    return {
      client: useConfigComponentStore().getWebsiteConfig,
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
                client.domainExpiredDate.toLocaleDateString(
                  "th-TH",
                  options as any
                )
              }}
            </p>
          </article>
        </div>
      </template>
    </CardExpand>
    <CardExpand headline="เบอร์โทรศัพท์">
      <template #content>
        <div class="flex flex-col gap-4">
          <h1>สำหรับไว้ใช้ในการทำธุรกรรม โปรดกรุณากรอก</h1>
          <FormKit
            v-model="client.phone"
            label="โปรดกรอกเบอร์"
            type="password"
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
