<template lang="pug">
  .page
    .page__bd
      .weui-search-bar
        .weui-search-bar__form
          .weui-search-bar__box
            icon.weui-icon-search_in-box(type="search", size="14")
            input.weui-search-bar__input(type="text", placeholder="请输入电影名称", v-model="inputVal", :focus="inputShowed", @input="inputTyping")
            .weui-icon-clear(v-if="inputVal.length > 0", @click="clearInput")
              icon(type="clear", size="14")
          label.weui-search-bar__label(:hidden="inputShowed", @click="showInput")
            icon.weui-icon-search(type="search", size="14")
            .weui-search-bar__text 搜索
        .weui-search-bar__cancel-btn(:hidden="!inputShowed", @click="hideInput") 取消
      .weui-cells.searchbar-result(v-if="searchResult.length > 0")
        navigator.weui-cell(url="", hover-class="weui-cell_active", v-for="item in searchResult" :key="item.id")
          .weui-cell__bd
            div {{item.title}}
</template>

<script>
export default {
  data () {
    return {
      inputShowed: false,
      inputVal: '',
      timer: '',
      searchResult: []
    }
  },
  methods: {
    // 显示搜索框的时候
    showInput () {
      // 更改标记显示状态
      this.inputShowed = true
    },
    // 隐藏搜索框
    hideInput () {
      // 隐藏时控件值为空
      this.inputVal = ''
      // 更改标记显示状态
      this.inputShowed = false
    },
    // 清除搜索框内容
    clearInput () {
      // 点击清除搜索框时控件值为空
      this.inputVal = ''
    },
    inputTyping (e) {
      // 输入时
      // console.log(e)
      // 时时更新控件值
      this.inputVal = e.mp.detail.value
      // 判断是否有延迟计时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 设置延迟计时器发送请求, 避免请求发送频繁
      this.timer = setTimeout(() => {
        this.getSearchResult('/movie/search', {q: this.inputVal})
      }, 500)
    },
    // 请求函数, 以get方式请求 参数1:请求地址, 参数2: 请求体对象
    getSearchResult (url, keyword) {
      // 发起搜索请求
      this.$http.get(url, keyword)
      .then(result => {
        if (this.searchResult.length <= 5) {
          this.searchResult = result.data.subjects.slice(0, 5)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
</style>