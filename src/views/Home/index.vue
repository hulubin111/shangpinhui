<template>
  <div class="home-container">
    <TypeNav />
    <ListContainer />
    <Recomend />
    <Rank />
    <Like />
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
import TypeNav from '@/views/Home/TypeNav/'
import ListContainer from '@/views/Home/ListContainer/'
import Recomend from '@/views/Home/Recommend/'
import Rank from '@/views/Home/Rank/'
import Like from '@/views/Home/Like/'
import Floor from '@/views/Home/Floor/'
import Brand from '@/views/Home/Brand/'
export default {
  name: 'Home',
  components: {
    TypeNav,
    ListContainer,
    Recomend,
    Rank,
    Like,
    Floor,
    Brand
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped></style>
