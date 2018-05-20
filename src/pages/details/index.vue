<template lang="pug">
  .page(v-if="have")
    .custom-cover
      image.custom-bg(:src="movie_info.images.large")
    .custom-main
      .custom-header
        image.custom-poster(:src="movie_info.images.large")
        .custom-title {{ movie_info.title + "(" + movie_info.year + ")" }}
      .custom-section
        .custom-clause
          span.custom-subTitle 评分:
          .custom-wrap {{ movie_info.rating.average ? movie_info.rating.average + "分" : "暂无评分" }}
        .custom-clause
          span.custom-subTitle 导演:
          .custom-wrap {{ movie_info.directors.length ? movie_info.directors[0].name : noData}}
        .custom-clause
          span.custom-subTitle 主演:
          .custom-wrap
            span.custom-casts(v-for="(item, i) in movie_info.casts", :key="i") {{ i != movie_info.casts.length - 1 ? item.name + " /" : item.name }}
        .custom-clause
          span.custom-subTitle 类型:
          .custom-wrap
            span.custom-genres(v-for="(item, i) in movie_info.genres", :key="i") {{ i != movie_info.genres.length - 1 ? item + " /" : item }}
        .custom-clause
          span.custom-subTitle 别名:
          .custom-wrap
            span.custom-aka(v-for="(item, i) in (movie_info.aka.length ? movie_info.aka : 1)", :key="i") {{ movie_info.aka.length ? (i != movie_info.aka.length - 1 ? "《" + item + "》/" : "《" + item + "》") : noData }}
        .custom-clause
          span.custom-subTitle 国家:
          .custom-wrap
            span.custom-countries(v-for="(item, i) in movie_info.countries", :key="i") {{ i != movie_info.countries.length - 1 ? item + " /" : item }}
      .custom-footer
        .custom-abstract 简介:
          .custom-article {{ movie_info.summary ? movie_info.summary : "暂无介绍"}}
  .page(v-else)
    .custom-loading
      BallSpinFadeLoader(size="18px", color="#11cd6e")

</template>

<script>
import BallSpinFadeLoader from 'mpvue-loading/src/loaders/ball-spin-fade'

export default {
  data () {
    return {
      have: false,
      movie_id: 0,
      movie_info: {},
      noData: '暂无数据'
    }
  },
  components: {
    BallSpinFadeLoader
  },
  methods: {
    // 获取电影详情
    getMovie (id) {
      let url = '/subject/' + id
      this.$http.get(url).then(res => {
        this.movie_info = res.data
        this.have = true
        wx.setNavigationBarTitle({
          title: this.movie_info.title ? this.movie_info.title : '暂无详情'
        })
      })
    }
  },
  onLoad: function () {
    this.have = false
    this.movie_info = {}
    this.movie_id = this.$root.$mp.query.movie_id
    wx.setNavigationBarTitle({
      title: '获取中...'
    })
    this.getMovie(this.movie_id)
  }
}
</script>

<style scoped>
  .custom-cover {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
  }

  .custom-bg {
    width: 100%;
    height: 100%;
    opacity: 0.2;
  }

  .custom-main {
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }

  .custom-header {
    width: 100%;
    text-align: center;
  }

  .custom-poster {
    width: 240px;
    height: 355px;
    margin-top: 15px;
  }

  .custom-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
    font-weight: 500;
  }

  .custom-section {
    width: 80%;
    margin: 0 auto;
  }

  .custom-clause {
    display: flex;
  }

  .custom-subTitle {
    width: 42px;
    flex-shrink: 0;
  }

  .custom-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .custom-casts, .custom-genres, .custom-countries{
    margin-right:4px;
  }

  .custom-footer {
    width: 90%;
    margin: 15px auto;

  }

  .custom-article {
    text-indent: 2em;
  }

  .custom-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
