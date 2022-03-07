<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leave" @mouseenter="enter">
        <h2 class="all">全部商品分类</h2>
        <transition>
          <div class="sort" @click="goSearch" v-show="sortShow">
            <div class="all-sort-list2">
              <div
                class="item bo"
                v-for="(item1, index) in categoryList"
                :key="item1.categoryId"
              >
                <h3
                  :class="{ curhover: index === currindex }"
                  @mouseover="changeindex(index)"
                >
                  <a
                    :data-categoryName="item1.categoryName"
                    :data-category1Id="item1.categoryId"
                    >{{ item1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: index === currindex ? 'block' : 'none'
                  }"
                >
                  <div
                    class="subitem"
                    v-for="item2 in item1.categoryChild"
                    :key="item2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="item2.categoryName"
                          :data-category2Id="item2.categoryId"
                          >{{ item2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="item3 in item2.categoryChild"
                          :key="item3.categoryId"
                        >
                          <a
                            :data-categoryName="item3.categoryName"
                            :data-category3Id="item3.categoryId"
                            >{{ item3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle.js'

export default {
  name: 'TypeNav',
  created() {
    if (this.$route.path !== '/home') {
      this.sortShow = false
    }
  },
  mounted() {},
  data() {
    return {
      currindex: -1,
      sortShow: true
    }
  },
  computed: {
    ...mapState({
      // 这个state是大仓库，用函数的写法可以改变映射过来的数据并做计算属性衍生新数据，但是一般都是在getters。
      // 所以，用数组就可以了。
      categoryList: (state) => {
        return state.home.categoryList
      }
    })
  },
  methods: {
    // 使用节流函数，规定在50毫秒内多次触发只执行一次。避免写箭头函数。会改变this指向。
    changeindex: throttle(function (i) {
      this.currindex = i
    }, 50),
    // 事件委派在种类名的父节点绑定这个事件
    goSearch(e) {
      // 1.但是需要点击a标签才可以跳转到search，可以通过自定义属性。
      // 2.规定传到服务器的id，需要我们指明是一级id还是二级id，还是三级id。也是通过自定义属性判定。
      const { categoryname, category1id, category2id, category3id } =
        e.target.dataset
      if (categoryname) {
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        location.query = query
        // 点击三级联动的所有类名都可以实现跳转到search路由组件。可以使用声明式导航，也可以使用编程式导航。
        // 但是如果把每一个类名的a标签改为router-link组件。我们知道每一个组件的使用，
        // 就是相当于实例化一个VueComponent构造函数的实例对象。
        // 三级联动的类名很多，就会实例化很多组件实例，当鼠标滑动一级类名时，三级联动的效果会卡顿。
        // 所以使用编程式导航比较好。但是使用编程式导航就要绑定点击事件，
        // 如果每个种类名都绑定事件肯定影响性能，所以使用事件委托的方式绑定事件到父节点。

        // 如果有params参数，要合并参数
        if (this.$route.params) {
          location.params = this.$route.params
        }
        this.$router.push(location)
      }
    },
    leave() {
      this.currindex = -1
      if (this.$route.path !== '/home') {
        this.sortShow = false
      }
    },
    enter() {
      this.sortShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .curhover {
            background: #e1251b;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    .v-enter {
      height: 0;
    }
    .v-enter-to {
      height: 461px;
    }
    .v-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
