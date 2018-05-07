<template lang="pug">
  .page
    .page__bd
      .weui-search-bar
        .custom-location
          .custom-city(@click="getPos")
            i.fa.fa-map-marker
            |
            | {{ city }}
        .weui-search-bar__form
          .weui-search-bar__box
            icon.weui-icon-search_in-box(type="search", size="14")
            input.weui-search-bar__input(type="text", placeholder="请输入电影名称", v-model="inputVal", :focus="inputShowed", @input="inputTyping")
            .weui-icon-clear(v-if="inputVal.length > 0", @click="clearInput")
              icon(type="clear", size="14")
          label.weui-search-bar__label(:hidden="inputShowed", @click="showInput")
            icon.weui-icon-search(type="search", size="14")
            .weui-search-bar__text 搜索电影
        .weui-search-bar__cancel-btn(:hidden="!inputShowed", @click="hideInput") 取消
      .weui-cells.searchbar-result(v-if="searchResult.length > 0")
        .custom-cell
          navigator.weui-cell(url="", hover-class="weui-cell_active", v-for="item in searchResult" :key="item.id")
            .weui-cell__bd
              div.custom-result {{item.title}}

</template>

<script>

import store from '@/store'
import {mapState, mapMutations} from 'vuex'

// 创建amap实例 高德api配置
const Map = require('@/common/sdk/map')

export default {
  store,
  data () {
    return {
      inputShowed: false,
      inputVal: '',
      timer: '',
      searchResult: [],
      city: '定位中...'
    }
  },
  onLoad: function () {
    this.getPos()
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
      // 搜索值清空
      this.searchResult = []
    },
    // 清除搜索框内容
    clearInput () {
      // 点击清除搜索框时控件值为空
      this.inputVal = ''
      // 搜索值清空
      this.searchResult = []
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
        this.getSearchResult('/search', {q: this.inputVal})
      }, 200)
    },
    // 获取定位
    getPos () {
      const that = this
      const map = new Map.AMapWX({key: '08dec595f2d0ece6a8c9007f4d57a3b0'})
      that.city = '定位中...'
      map.getRegeo({
        success: (res) => {
          that.city = res[0]['regeocodeData']['addressComponent']['province']
          that.changeProvince(that.province)
        },
        fail: (info) => {
          that.city = '定位失败'
        }
      })
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
    },
    ...mapMutations(['changeProvince'])
  },
  computed: mapState(['province'])
}
</script>

<style scoped>

  .weui-search-bar {
    background-color: #FFF;
  }

  .custom-location {
    font-size: 14px;
    vertical-align:middle;
    line-height: 28px;
    padding-right:5px;
  }

  .custom-city {
    display: inline-block;
    width: 68px;
    text-align: center;
    color: #444;
  }

  .weui-search-bar__form {
    border-radius: 50px;
  }

  .weui-search-bar__label {
    border-radius: 50px;
    transition: display 5s;
  }

  .weui-search-bar__cancel-btn {
    font-size: 16px;
    color: #00b600;
    font-weight: 400;
  }

  .searchbar-result {
    margin-top: 0;
  }

  .searchbar-result:before {
    display: none;
  }

  .weui-cell {
    padding: 5px 15px 5px 35px;
    z-index:999;
    background: rgb(255, 255, 255);
  }

  .custom-cell {
    position: absolute;
    width: 100%;

  }

  .custom-result {
    font-size: 14px;
  }
</style>