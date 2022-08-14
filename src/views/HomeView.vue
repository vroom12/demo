<template>
  <div class="home">
    <tab-bar></tab-bar>
    <div class="top" >
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in topStories" :key="index" @click="change(item.id)"
          ><van-image class="pop" :src="item.image" fit="cover" />

          <div
            class="bottom"
            :style="{
              background: '#' + item.image_hue.substr(2, 8) + 'd5',
              background: `
           linear-gradient(0,#${item.image_hue.substr(
             2,
             8
           )},#${item.image_hue.substr(2, 8)}e6,#${item.image_hue.substr(
                2,
                8
              )}00)`,
            }"
          >
            <h3>{{ item.title }}</h3>
            <h5>{{ item.hint }}</h5>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="max">
      <div
        class="below"
        v-for="(item, index) in stories"
        :key="index"
        @click="change(item.id)"
      >
        <div class="leftbox">
          <h4>{{ item.title }}</h4>
          <h5>{{ item.hint }}</h5>
        </div>
        <div class="rightbox">
          <van-image class="pop1" :src="item.images[0]" fit="cover" />
        </div>
      </div>
      <van-divider content-position="left">{{ dates | showTime}}</van-divider>
    </div>
    <div class="addLoad" @click="addLoad" ref="addLoad">
      <van-loading />
    </div>
  </div>
</template>

<script>
import tabBar from "../components/tabBar.vue";
export default {
  filters: {
    showTime(value) {
      function addZero(index) {
        return index < 10 ? "0" + index : index;
      }
      var time = new Date(value * 1000);
      var month = addZero(time.getMonth() + 1);
      var day = addZero(time.getDate());
      
      return month + "月" + day 
    },
  },
  components: { tabBar },
  name: "HomeView",
  created() {
    this.axios.get("/stories/latest").then((re) => {
      console.log(re);
      this.topStories = re.data.top_stories;
      this.stories = re.data.stories;
      this.dates = re.data.date;
      console.log("dates===>", this.dates);
      var time = new Date();
      this.month = this.months[time.getMonth()];
      
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollfn);
  },
  //组件销毁前的生命周期
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollfn);
  },
  beforeRouteLeave(to,from,next){
    window.removeEventListener("scroll", this.scrollfn);
    next();
  },
  data() {
    return {
      topStories: [],
      stories: [],
      dates: "",
      months: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ],
      month: "",
    };
  },
  methods: {
    change(id) {
      this.$router.push("/detalis/" + id);
      // console.log(id);
    },
    getLoad(index) {
      // console.log(123);
      this.axios.get("/stories/before/" + index).then((re) => {
        // console.log("re===>",re);
        // console.log("没有解构的",re.data.stories);
        // console.log("有解构的",...re.data.stories);
        this.stories.push(...re.data.stories);
        this.dates = re.data.date;
      });
    },
    addLoad() {
      this.getLoad(this.dates);
    },
    scrollfn() {
      var a = document.scrollTop || document.documentElement.scrollTop;
      var b = window.innerHeight;
      var c = this.$refs.addLoad.offsetTop;
      // console.log(a, b, c);
      if (a + b - 48 >= c) {
        this.addLoad();
      }
    },
  },
};
</script>

<style scoped>
.home {
  /* background-color: rgb(71, 70, 70); */
  color: black;
}
.my-swipe {
  width: 100vw;
  height: 100vw;
  position: relative;
}
::v-deep .van-swipe__indicators {
  left: auto;
  right: 0;
}
::v-deep .van-swipe__indicator--active {
  width: 4vw;
  border-radius: 35%;
}
.top {
  width: 100vw;
  height: 100vw;
}
.pop {
  width: 100%;
  height: 100%;
}
.bottom {
  width: 100vw;
  height: 40vw;
  /* border: 1px solid red; */
  position: absolute;
  bottom: 0;
  color: white;
}
.bottom h3 {
  font-size: 20px;
  margin-top: 13vw;
  margin-left: 5vw;
}
.bottom h5 {
  font-size: 10px;
  margin-left: 5vw;
  margin-top: 2vw;
  font-weight: 500;
}
.max {
  margin-top: 2vw;
  /* border: 1px solid red; */
}
.below {
  width: 100vw;
  height: 25vw;
  /* border: 1px solid red; */
  color: black;
  display: flex;
  justify-content: space-between;
  /* background-color: rgb(71, 70, 70); */
}
.rightbox {
  width: 20vw;
  height: 20vw;
  margin-top: 2.3vw;
  margin-right: 4vw;
  border-radius: 2.5px;
  overflow: hidden;
  /* border: 1px solid red; */
}
.pop1 {
  width: 100%;
  height: 100%;
}
.leftbox {
  width: 70vw;
  height: 20vw;
  margin-top: 2.3vw;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.leftbox h4 {
  width: 65vw;
  /* border: 1px solid red; */
  font-size: 18px;
  margin-left: 4vw;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.leftbox h5 {
  width: 65vw;
  /* border: 1px solid red; */
  margin-left: 4vw;
  font-size: 12px;
  font-weight: 500;
}
.addLoad {
  height: 50px;
  text-align: center;
  /* border:1px solid red; */
  line-height: 50px;
}
</style>
