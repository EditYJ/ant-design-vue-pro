<template>
  <div>提交结果：{{ result }}</div>
</template>

<script>
export default {
  data() {
    return {
      result: this.$store.state.step
    };
  }
};
</script>

<style></style>
