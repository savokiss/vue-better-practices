<template>
  <div class="toast" v-show="show">
    <div class="toast-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      text: '',
      duration: 2000
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2001;
}

.toast-text {
  min-width: 2rem;
  min-height: 1.4rem;
  padding: 2rem 1rem;
  background: rgba(17, 17, 17, 0.7);
  text-align: center;
  border-radius: 5px;
  color: #ffffff;
  font-size: 14px;
}
</style>
