import Vue from 'vue'
import Vuex from 'vuex'
import mixin from './mixin'

Vue.mixin(mixin)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    markdown: (() => {
      const markdown = localStorage.getItem('idaten.markdown')
      if (markdown) return markdown

      return `# サンプルについて
サブタイトル : サブタイトル
日付 : 2019-01-01
宛名 : 〇〇様
製作者 : 〇〇

## Slide1

### Slide2
1. Ordered List1
2. Ordered List2
`
    })()
  },
  getters: {
    markdown: state => {
      return state.markdown
    }
  },
  mutations: {
    markdown (state, data) {
      localStorage.setItem('idaten.markdown', data)
      state.markdown = data
    }
  },
  actions: {

  }
})
