/**
  列表面板
 */
<template lang="pug">
  .page
    .page__hd
      textTitle(:title="title")
    .page__bd(v-for="(item, i) in (isHave ? about : 2)", :key="i")
      itemPanel(v-bind:isMore="isMore[i]", v-bind:listData="item", v-bind:watched="watched[i]", v-bind:have="have", v-bind:num="num", v-bind:url="url[i]")

</template>

<script>

import textTitle from '@/components/textTitle'
import itemPanel from '@/components/itemPanel'

export default {
  data () {
    return {
      have: false,
      title: '影片榜单',
      isMore: [true, true],
      watched: [false, true],
      about: [],
      url: ['/coming_soon', '/top250'],
      count: [10, 10],
      num: 10
    }
  },
  mounted: function () {
    const that = this
    this.url.forEach(async (item, index) => {
      that.about.push(await that.getResult(item + '?count=' + that.count[index]))
    })
  },
  methods: {
    async getResult (url) {
      return this.$http.get(url)
        .then(result => {
          return result.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    isHave: function () {
      if (this.about.length === 2) {
        this.have = true
      }
      return this.have
    }
  },
  components: {
    textTitle,
    itemPanel
  }
}
</script>

<style scoped>



</style>

