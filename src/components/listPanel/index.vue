/**
  列表面板
 */
<template lang="pug">
  .page
    .page__hd
      textTitle(:title="title")
    .page__bd(v-for="(item, i) in about", :key="i")
      itemPanel(v-bind:isMore="isMore[i]", v-bind:listData="item", v-bind:watched="watched[i]")


</template>

<script>

import textTitle from '@/components/textTitle'
import itemPanel from '@/components/itemPanel'

export default {
  data () {
    return {
      title: '影片榜单',
      isMore: [true, true],
      watched: [false, true],
      about: [],
      url: ['/coming_soon?count=10', '/top250?count=10']
    }
  },
  mounted: function () {
    const that = this
    this.url.forEach(async (item, index) => {
      that.about.push(await that.getResult(item))
    })
  },
  methods: {
    async getResult (url) {
      return await this.$http.get(url)
          .then(result => {
            return result.data
          })
          .catch((error) => {
            console.log(error)
          })
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

