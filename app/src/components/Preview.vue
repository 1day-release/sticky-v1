<template>
  <div class="preview">
    <ul class="preview-list">
      <li v-for="(value, index) in slideMarkdown" :key="index">
        <Slide :markdown="value" />
      </li>
    </ul>
  </div>
</template>

<script>
import Slide from '@/components/Slide.vue'

export default {
  name: 'Preview',
  components: {
    Slide
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    slideMarkdown () {
      return this.$_getSlideMarkdown(this.$store.getters.markdown)
    }
  }
}
</script>

<style scoped lang="scss">
  .preview {
    position: relative;
    width: 100%;
    height: 100%;

    &-list {
      position: absolute;
      left: 20px;

      >li {
      }
    }
  }
</style>
