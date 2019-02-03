<template>
  <span class="user-icon">
    <img src="//placehold.jp/150x150.png" alt="">
  </span>
</template>

<script>
export default {
  name: 'UserIcon',
  props: {
  }
}
</script>

<style scoped lang="scss">
  .user-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    border-radius: 50%;

    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    >img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>
