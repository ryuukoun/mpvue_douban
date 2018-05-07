/**
* 这是一个轮播图组件
*/
<template lang="pug">
  .page
    view.page__hd
      textTitle(:title="title")
    .page__bd.page__bd_spacing
      swiper(:indicator-dots="indicatorDots", :autoplay="autoplay", :interval="interval", :duration="duration", :circular="circular", :displayMultipleItems="displayMultipleItems", :previous-margin="previousMargin", :next-margin="nextMargin")
        div(v-for="(item, i) in movies", :key="item.id")
          swiper-item
            image.swiper-image(:src="item.imgUrl", alt="item.title")
            .custom-title {{ item.title }}
            .custom-rating(v-if="item.average != 0")
              span.custom-rating-star(v-for="(star, j) in [1, 2, 3, 4, 5]", :key="j")
                i.fa.fa-star.gray(aria-hidden="true" v-if="star >= item.star")
                i.fa.fa-star.full(aria-hidden="true" v-if="star < item.star")
              span.custom-subject-rate.full {{ item.average }}
            .custom-rating(v-else)
              span.custom-not-available 暂无评分

</template>

<script>

import store from '@/store'
import {mapState} from 'vuex'
import textTitle from '@/components/textTitle'

export default {
  store,
  data () {
    return {
      title: '影院热映',
      autoplay: false,
      interval: 5000,
      duration: 900,
      displayMultipleItems: 3,
      previousMargin: '10px',
      nextMargin: '10px',
      movies: []
    }
  },
  components: {
    textTitle
  },
  mounted: function () {
    this.getMovies()
  },
  methods: {
    // 获取当前定位城市的热映电影
    getMovies () {
      this.$http.get('/in_theaters', {city: this.province.slice(0, this.province.length - 1), count: 15})
      .then(result => {
        result.data.subjects.forEach(item => {
          this.movies.push({
            id: item.id,
            title: item.title,
            imgUrl: item.images.small,
            average: item.rating.average.toFixed(1),
            star: item.rating.average / 2
          })
        })
      })
    }
  },
  computed: {
    ...mapState(['province'])
  }
}
</script>

<style scoped>
  .page__title {
    margin-left: 17px;
    padding: 8px 0;
  }

  /* .custom-page-line {
    display: inline-block;
    width: 5px;
    height: 22px;
    margin:0 9px 0 0;
    background-color: #00b600;
    vertical-align: middle;
  }

  .custom-page-title {
    height: 22px;
    display: inline-block;
    line-height: 22px;
    vertical-align:middle;
  } */

  swiper {
    height: 210px;
  }

  .custom-title {
    text-align: center;
    font-size: 12px;
    color: #494949;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .custom-rating {
    width: 70%;
    height: 16px;
    margin: 0 auto;
    line-height: 16px;
    text-align: center;
  }

  .custom-rating-star {
    font-size: 12px;
  }

  .custom-not-available {
    font-size: 12px;
    color: #9b9b9b;
  }

  .full {
    color: #F7AA12;
  }

  .gray {
    color: #DFDFDF;
  }

  .custom-subject-rate {
    display: inline-block;
    font-size: 12px;
    padding: 0 5px;
  }

  .swiper-image {
    width: 100%;
    height: 160px;
    margin: 0 7px;
  }

</style>