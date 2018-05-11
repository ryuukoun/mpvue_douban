/**
  列表子元素面板
*/
<template lang="pug">
  .weui-panel.weui-panel_access
    .weui-panel__hd(v-show="listData.title") {{ listData.title }}
    .weui-panel__bd
      navigator.weui-media-box.weui-media-box_appmsg.custom-layout(url="", hover-class="weui-cell_active", v-for="(item, j) in listData.subjects", :key="item.id")
        .weui-media-box__hd.weui-media-box__hd_in-appmsg.custom-thumb
          image.weui-media-box__thumb(:src="item.images.small")
        .weui-media-box__bd.weui-media-box__bd_in-appmsg.custom-fontSize
          .weui-media-box__title.custom-title {{ item.title }}
          .custom-main
            .custom-synopsis
              .custom-year(v-if="item.year") 年份: {{ item.year }}
              .gray.custom-year(v-else) 年份: {{ noData }}
              .custom-directors(v-if="item.directors[0].name") 导演: {{ item.directors[0].name }}
              .gray.custom-directors(v-else) 导演: {{ noData }}
              .custom-genres(v-if="item.genres") 类型:
                span.custom-tags(v-for="(tag, i) in item.genres", :key="i") {{ i != item.genres.length - 1 ? tag + " /" : tag }}
              .gray.custom-genres(v-else) 类型: {{ noData }}
            .custom-evaluate
              .custom-grade(v-if="average[j] !== '暂无评分'") 评分:
                span.custom-integer {{ average[j][0] }}
                span.custom-decimal {{ "." + average[j][1] }}
              .custom-grade(v-else) 评分:
                span.gray {{ average[j] }}
              .custom-collect(v-show="watched") 看过:
                i.fa.fa-heart.custom-iconSpace.custom-ginsyu(aria-hidden="true")
                span.collectCount {{ item.collect_count }}
    .weui-panel__ft(v-show="isMore")
      .weui-cell.weui-cell_access.weui-cell_link
        .weui-cell__bd 查看更多
        .weui-cell__ft.weui-cell__ft_in-access

</template>

<script>
export default {
  props: ['isMore', 'listData', 'watched'],
  data () {
    return {
      noData: '暂无信息'
    }
  },
  computed: {
    average: function () {
      let tmp = []
      if (!this.listData.subjects) {
        return
      }
      this.listData.subjects.forEach(item => {
        if (item.rating.average === 0) {
          tmp.push('暂无评分')
        } else {
          tmp.push(String(item.rating.average.toFixed(1)).split('.'))
        }
      })
      return tmp
    }
  }
}
</script>

<style scoped>

.custom-layout {
  padding: 15px 5px 15px 15px;
}

.custom-title {
  font-size: 15px;
}

.custom-thumb {
  height: 89px;
  margin-right:10px;
}

.custom-fontSize {
  font-size: 14px;
  line-height: 1.6;
}

.custom-main {
  display: flex;
  align-items:flex-end;
}

.custom-synopsis {
  width: 51%;
  margin-left: 7px;
}

.custom-evaluate {
  width: 42%;
  margin-left: 10px;
}

.custom-grade {
  display: flex;
  align-items: flex-end;
}

.gray {
  color: #9b9b9b;
}

.custom-tags {
  margin-left: 4px;
}

.custom-directors {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.custom-genres {
  display: flex;
  align-items: center;
}

.custom-integer, .custom-decimal {
  font-family: 'DINPro';
  font-style: italic;
  color: #F7AA12;
}

.custom-integer {
  font-size: 32px;
  line-height: 32px;
}

.custom-decimal {
  font-size: 21px;
  line-height: 24px;
}

.custom-iconSpace {
  margin-right: 3px;
}

.custom-ginsyu {
  color: 	#F02644;
}

.custom-space {
  height: 10px;
  width: 100%;
}

</style>
