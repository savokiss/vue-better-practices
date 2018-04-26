<template>
  <div class="LoadingDemo">
    <button class="btn" @click="onLoading">Loading on 3s</button>
  </div>
</template>

<script>
export default {
  methods: {
    onLoading() {
      this.$loading.on()
      setTimeout(() => {
        this.$loading.off()
      }, 3000)
    }
  }
}
</script>
