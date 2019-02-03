<template>
  <ul class="user-slide-list">
    <li>
      <a class="user-slide" href="#">
        <Slide />
      </a>
    </li>
    <li>
      <a class="user-slide" href="#">
        <Slide />
      </a>
    </li>
  </ul>
</template>

<script>
import Slide from '@/components/Slide.vue'

export default {
  name: 'UserSlideList',
  components: {
    Slide
  },
  props: {
  }
}
</script>

<style scoped lang="scss">
.l-user-slide {
}

.user-slide {
  &-list {

    >li {
    }
  }

  color: inherit;
  text-decoration: none;
}
</style>
