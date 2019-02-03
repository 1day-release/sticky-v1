<template>
  <a class="login-button" href="#" target="_blank">ログイン</a>
</template>

<script>
export default {
  name: 'LoginButton',
  props: {
  }
}
</script>

<style scoped lang="scss">
  .login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 95px;
    height: 30px;
    color: inherit;
    text-decoration: none;
    background-color: map-get($color-brand, "accent");
    border-radius: 15px;
  }
</style>
