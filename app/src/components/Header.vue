<template>
  <header>
    <div class="l-header">
      <h1 class="header-logo">
        <a href="#">
          <BrandLogo />
        </a>
      </h1>
      <div class="header-tools">
        <ul class="header-tool">
          <li>
            <UserSlideListShowButton />
          </li>
        </ul>
        <ul class="header-tool">
          <li>
            <PresentationButton />
          </li>
          <li class="is_separate is_login">
            <LogoutButton />
          </li>
          <li class="is_login">
            <div class="user">
              <UserIcon />
            </div>
          </li>
          <li class="is_separate is_logout">
            <LoginButton />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import BrandLogo from '@/components/BrandLogo.vue'
import UserSlideListShowButton from '@/components/UserSlideListShowButton.vue'
import PresentationButton from '@/components/PresentationButton.vue'
import UserIcon from '@/components/UserIcon.vue'
import LoginButton from '@/components/LoginButton.vue'
import LogoutButton from '@/components/LogoutButton.vue'

export default {
  name: 'Header',
  components: {
    BrandLogo,
    UserSlideListShowButton,
    PresentationButton,
    UserIcon,
    LoginButton,
    LogoutButton
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.l-header {
  position: relative;
  height: $pc-header-height;
  background-color: map-get($color-brand, "base");
}

.header {
  &-logo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin: auto;

    >a {
      display: block;
      overflow: hidden;
      width: inherit;
    }
  }

  &-tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  &-tool {
    $padding: 15px;

    display: flex;
    height: inherit;

    >li {
      box-sizing: border-box;
      flex: 0 0 auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      min-width: 64px;
      padding-right: $padding;
      padding-left: $padding + 1px;
      height: inherit;

      &::before,
      &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 1px;
        height: 30px;
        background-color: map-get($color-brand, "border-light");
      }

      &::before {
        content: "";
        left: 0;
      }

      &:first-child {

        &::before {
          content: none;
        }
      }

      &.is_separate {
        &::before,
        &::after {
          height: auto;
        }
      }

      @at-root #app:not(.is_logout) &.is_logout {
        display: none;
      }

      @at-root #app.is_logout &.is_login {
        display: none;
      }
    }

    &:first-child {
      >li {
        &:last-child {
          padding-right: $padding + 1px;
          padding-left: $padding;

          &::after {
            content: "";
            right: 0;
          }
        }
      }
    }
  }
}

.user {
  width: 30px;
  height: 30px;
}
</style>
