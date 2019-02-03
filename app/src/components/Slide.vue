<template>
  <div class="slide" :class="['slide-type' + slideType]" v-html="marked"></div>
</template>

<script>
import Marked from 'marked'

export default {
  name: 'Slide',
  data () {
    return {
    }
  },
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
    slideType () {
      if (this.markdown.indexOf('# ') === 0) {
        return 1
      } else if (this.markdown.indexOf('## ') === 0) {
        return 2
      } else {
        return 3
      }
    },
    marked () {
      let str = ''
      if (this.slideType === 1) {
        let title = ''
        let subtitle = ''
        let date = ''
        let to = ''
        let from = ''
        this.markdown.split(/\n/).forEach((line, lineNum) => {
          const cutStart = (line.indexOf(': ') >= 0) ? (line.indexOf(': ')) + 2 : 0
          if (lineNum === 0) {
            title = line
          } else if (lineNum === 1) {
            subtitle = line.slice(cutStart)
          } else if (lineNum === 2) {
            date = line.slice(cutStart)
          } else if (lineNum === 3) {
            to = line.slice(cutStart)
          } else if (lineNum === 4) {
            from = line.slice(cutStart)
          }
        })
        str =
         ((to) ? `<p class="to">${to}</p>\n` : '') +
         ((title) ? `\n${title}\n` : '') +
         ((subtitle) ? `<p class="subtitle">${subtitle}</p>\n` : '') +
         ((date) ? `<p class="date">${date}</p>\n` : '') +
         ((from) ? `<p class="from">${from}</p>\n` : '') +
         '\n'
      } else if (this.slideType === 2) {
        let title = ''
        this.markdown.split(/\n/).forEach((line, lineNum) => {
          if (lineNum === 0) {
            title = line
          }
        })
        str = ((title) ? title + '\n' : '')
      } else {
        str = this.markdown
      }
      return Marked(str)
    }
  }
}
</script>

<style scoped lang="scss">
.slide {
  background: white;
  width: 100%;
  min-height: 70%;
  color: #000c36;
  &.slide-type1  /deep/ {
    padding: 5% 5%;
    box-sizing: border-box;
    p:nth-of-type(1) {
      font-size: 16px;
      margin-bottom: 25%;
    }
    h1 {
      font-size: 30px;
      margin-bottom: 2%;
    }
    p:nth-of-type(2) {
      margin-bottom: 25%;
    }
    p:nth-of-type(3) {
      color: #cbcdd6;
      margin-bottom: 1%;
    }
    p:nth-of-type(4) {
      color: #cbcdd6;
    }
  }
  &.slide-type2  /deep/ {
    h2 {
      margin-top: 30%;
      font-size: 30px;
      color: #000c36;
      text-align: center;
    }
  }
  &.slide-type3  /deep/ {
    padding: 10% 10%;
    box-sizing: border-box;
    h3 {
      margin-bottom: 5%;
      font-size: 30px;
      color: #000c36;
      text-align: center;
    }

    ol {
      list-style-type: decimal;
    }

    ul {
      list-style-type: disc;
    }
  }
}
</style>
