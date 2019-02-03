<template>
  <div class="presentation" @click="nextSlide" @contextmenu.prevent="prevSlide">
    <Slide :markdown="slideMarkdown[nowSlideNum]" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Slide from '@/components/Slide.vue'

export default {
  name: 'Presentation',
  components: {
    Slide
  },
  data () {
    return {
      nowSlideNum: 0
    }
  },
  created () {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 39) {
        this.nextSlide()
      } else if (event.keyCode === 37) {
        this.prevSlide()
      }
    })
  },
  methods: {
    nextSlide () {
      if (this.nowSlideNum < this.slideMarkdown.length - 1) this.nowSlideNum++
    },
    prevSlide () {
      if (this.nowSlideNum > 0) this.nowSlideNum--
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
  .presentation {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
