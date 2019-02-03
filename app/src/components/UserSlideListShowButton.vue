<template>
  <div class="user-slide-list-show">
    <button class="user-slide-list-show-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="21.333" height="16" viewBox="0 0 21.333 16">
        <path id="iconmonstr-menu-3" d="M14.222,6.556H0V3H14.222ZM9.778,9.222H0v3.556H9.778Zm2.667,6.222H0V19H12.444Zm4.444-8v7.178L21.333,11Z" transform="translate(0 -3)" fill="#cbcdd6"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserSlideListShowButton',
  props: {
  }
}
</script>

<style scoped lang="scss">
  .user-slide-list-show {

    &-button {
      appearance: none;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      padding: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;

      svg {
        path {
          transition-duration: $duration;
        }
      }

      &:hover {

        svg {
          path {
            fill: map-get($color-brand, "sub");
          }
        }
      }
    }

    #app.is_logout & {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        z-index: 10;
        top: -2px;
        right: -2px;
        bottom: -2px;
        left: -2px;
        margin: auto;
        display: block;
        background-color: rgba( map-get($color-brand, "black"), 0.3 );
      }

      &-button {
        pointer-events: none;
      }
    }
  }
</style>
