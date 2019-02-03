<template>
  <div class="editor">
    <textarea v-model="markdown" @input="editorInput">
    </textarea>
    <Popups>
      <PopupLogout />
    </Popups>
  </div>
</template>

<script>
import Popups from '@/components/Popups.vue'
import PopupLogout from '@/components/PopupLogout.vue'

export default {
  name: 'Editor',
  components: {
    Popups,
    PopupLogout
  },
  props: {
  },
  data () {
    return {
      markdown: this.$store.getters.markdown
    }
  },
  methods: {
    editorInput () {
      this.$store.commit('markdown', this.markdown)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .editor {
    position: relative;
    width: 100%;
    height: 100%;

    textarea {
      box-sizing: border-box;
      position: absolute;
      top: 40px;
      right: 40px;
      bottom: 70px;
      width: 80%;
      padding-right: 20px;
      border: none;
      max-width: $pc-min-width * 0.8 - 40px;
      margin: auto;
      line-height: 1.8;
      font-family: $ff-mono;
      color: rgba( map-get($color-brand, "text-white"), 0.9 );
      -webkit-font-smoothing: subpixel-antialiased;
      background-color: transparent;
      resize: none;
      outline: none;

      @include scrollBarRight(7px, 7px, rgba(#fff, 0.3), rgba(#fff, 0.1));
    }
  }
</style>
