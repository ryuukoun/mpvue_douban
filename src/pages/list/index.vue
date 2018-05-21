<template lang="pug">
  .page
    itemPanel(v-bind:isMore="isMore", v-bind:listData="about", v-bind:watched="watched", v-bind:have="have", v-bind:num="num")
</template>

<script>

import itemPanel from '@/components/itemPanel'

export default {
  data () {
    return {
      have: false,
      isMore: false,
      watched: false,
      about: '',
      url: '',
      config: {
        start: 25,
        count: 25
      },
      num: 25
    }
  },
  methods: {
    async getList (url) {
      await this.$http.get(url)
        .then(result => {
          this.about = result.data
          this.have = true
        })
        .then(() => {
          wx.setNavigationBarTitle({
            title: this.about.title
          })
        })
    }
  },
  components: {
    itemPanel
  },
  onLoad: function () {
    let q = this.$root.$mp.query.q ? '?' + this.$root.$mp.query.q + '&' : '?'
    this.url = this.$root.$mp.query.url + q
    this.watched = Boolean(this.$root.$mp.query.watched - 0)
    wx.setNavigationBarTitle({
      title: '获取列表中...'
    })
    this.getList(this.url + 'count=' + this.config.count)
  },
  // 上拉刷新
  onPullDownRefresh: function () {
    this.have = false
    wx.setNavigationBarTitle({
      title: '获取列表中...'
    })
    this.getList(this.url + 'count=' + this.config.count)
      .then(() => {
        this.config.start = 25
        wx.stopPullDownRefresh()
      })
  },
  // 下拉加载
  onReachBottom: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
      success: function () {
        if (that.about.count < that.about.total) {
          let tmp = that.about
          that.getList(that.url + 'start=' + that.config.start + '&count=' + that.config.count)
            .then(() => {
              tmp.subjects = [...tmp.subjects, ...that.about.subjects]
              that.about = tmp
              that.about.count = that.about.subjects.length
              that.config.start += that.config.count
              console.log(that)
              wx.hideLoading()
            })
        } else {
          wx.showToast({
            title: '没有更多数据了哟~',
            icon: 'none'
          })
        }
      }
    })
  },
  // 重置数据
  onUnload: function () {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style scoped>

</style>
