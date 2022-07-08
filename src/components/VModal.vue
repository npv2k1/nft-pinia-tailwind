<template>
  <div v-if="visible" class="base-modal">
    <div class="base-modal-box">
      <i
        v-if="showClose"
        class="ion-close base-modal__icon-close"
        @click="close()"
      ></i>
      <div class="base-modal__header">
        {{ title }}
      </div>
      <div class="base-modal__body">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VModal",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style>
.base-modal {
  padding: 10px;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1400;
  text-align: center;
  white-space: nowrap;
  font-size: 0;
}
.base-modal-box {
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  position: relative;
  top: 20%;
  max-width: 490px;
  background: white;
  padding: 20px 40px;
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4);
}
.base-modal__header {
  font-weight: 700;
  font-size: 21px;
}
.base-modal__icon-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
</style>
