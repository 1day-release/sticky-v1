<template>
  <button class="logout-button" href="#" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20">
      <path id="iconmonstr-log-out-14" d="M16,12.771H12.909a1.149,1.149,0,0,1-1.055-.513L10.61,10.584l-2.029,2.2,1.008,1.562a2.275,2.275,0,0,1,.373,1.42V20H8V16.019c-.016-1.1-1.7-2.143-2.313-1.253L4.511,16.425a1.334,1.334,0,0,1-1.139.5H0V15.017H2.532a.911.911,0,0,0,.928-.586l1.126-2.75a3.96,3.96,0,0,1,.782-1.1l2.625-2.6-.741-.647A.98.98,0,0,0,6.44,7.1l-2.181.381-.342-1.6,2.992-.571a1.619,1.619,0,0,1,1.461.462l2.882,2.66a13.809,13.809,0,0,1,1.654,2.215.869.869,0,0,0,.766.477H16v1.642ZM13.018,7.729a1.881,1.881,0,1,0-2.2-1.495,1.881,1.881,0,0,0,2.2,1.495ZM18,2V17l6,5V2Z" transform="translate(0 -2)" fill="#cbcdd6"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'LogoutButton',
  props: {
  }
}
</script>

<style scoped lang="scss">
  .logout-button {
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
</style>
