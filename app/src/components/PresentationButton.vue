<template>
  <router-link class="presentation-button" :to="{name: 'Presentation'}" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="18.333" height="20" viewBox="0 0 18.333 20">
      <path id="iconmonstr-flip-chart-5" d="M13.907,16.667,16.752,20H14.563l-2.85-3.333ZM9.333,20H11V16.667H9.333ZM3.568,20H5.758l2.85-3.333H6.413Zm4.1-15v5.833L13.5,8,7.667,5ZM18.5,2.5V13.333h.833V15H1V13.333h.833V2.5H1V0H19.333V2.5Zm-1.667,0H3.5V13.333H16.833Z" transform="translate(-1)" fill="#cbcdd6"/>
    </svg>
    <span class="presentation-button-text">
      プレゼンモード
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'PresentationButton',
  props: {
  }
}
</script>

<style scoped lang="scss">
  .presentation-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    color: inherit;
    text-decoration: none;

    svg {
      path {
        transition-duration: $duration;
        // fill: map-get($color-brand, "sub");
      }
    }

    &-text {
      box-sizing: border-box;
      position: absolute;
      top: calc(100% + #{15px - 1px - 5px});
      right: -165%;
      left: -165%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 26px;
      margin: 0 auto;
      color: map-get($color-brand, "text-white");
      background-color: map-get($color-brand, "gray");
      border-radius: 13px;
      box-shadow: 4px 4px 11px 0 map-get($color-brand, "shadow");
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition-duration: $duration;

      &::before {
        content: "";
        position: absolute;
        top: -5px;
        right: 0;
        left: 0;
        display: block;
        width: 0;
        height: 0;
        border-width: 0 3px;
        border-style: solid;
        border-color: transparent;
        border-bottom: 5px solid map-get($color-brand, "gray");
        margin: 0 auto;
      }
    }

    &:hover {
      svg {
        path {
          fill: map-get($color-brand, "sub");
        }
      }

      .presentation-button {
        &-text {
          top: calc(100% + #{15px - 1px});
          opacity: 1;
        }
      }
    }
  }
</style>
