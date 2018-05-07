/**
* 封装了一个标题组件
*/
<template lang="pug">
  view.page__title
    span.custom-page-line
    |
    span.custom-page-title {{ title }}

</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
  .page__title {
      margin-left: 17px;
      padding: 8px 0;
  }

  .custom-page-line {
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
  }

</style>
