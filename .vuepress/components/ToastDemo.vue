<template>
  <div class="ToastDemo">
    <button class="btn" @click="onToast">Default Toast Last 2s</button>

    <hr>
    <button class="btn" @click="onToastWithConfig">Toast Last 5s</button>
  </div>
</template>

<script>
export default {
  methods: {
    onToast() {
      this.$toast('default toast')
    },
    onToastWithConfig () {
      this.$toast({
        text: 'config toast',
        duration: 5000
      })
    }
  }
}
</script>
