<template>
  <div>
    <Header />
    <Main>
      <div class="l-user-slide">
        <UserSlideList />
      </div>
      <div class="l-editor">
        <Editor />
      </div>
      <div class="l-preview">
        <Preview />
      </div>
    </Main>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'
import Main from '@/components/Main.vue'
import UserSlideList from '@/components/UserSlideList.vue'
import Editor from '@/components/Editor.vue'
import Preview from '@/components/Preview.vue'

export default {
  name: 'Edit',
  components: {
    Header,
    Main,
    UserSlideList,
    Editor,
    Preview
  }
}
</script>

<style scoped lang="scss">
  main {
    display: flex;
    justify-content: space-between;
  }

  .l-editor {
    width: 65%;
    height: calc(100vh - #{$pc-header-height});
    color: map-get($color-brand, "text-white");
    background-color: map-get($color-brand, "main");
  }

  .l-preview {
    width: 35%;
    height: calc(100vh - #{$pc-header-height});
    background-color: map-get($color-brand, "sub");
  }
</style>
