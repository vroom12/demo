<template>
  <div class="maxdiv">
    <div class="top">
      <van-image :src="story.image" fit="cover" />
      <div
        v-if="story.imageHue"
        class="text"
        :style="{
          background: '#' + story.imageHue.substr(2, 8) + 'd5',
          background: `linear-gradient(0,#${story.imageHue.substr(
            2,
            8
          )},#${story.imageHue.substr(2, 8)}e6,#${story.imageHue.substr(
            2,
            8
          )}00)`,
        }"
      >
        <h3>{{ story.title }}</h3>
      </div>
    </div>
    <div class="center" v-html="story.body"></div>
    <div class="tab">
      <router-view />
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="arrow-left"></van-tabbar-item>
        <van-tabbar-item
          replace
          to="/cate"
          @click="change(story.id)"
          icon="comment-o"
          :badge="comment.comments"
        ></van-tabbar-item>
        <van-tabbar-item
          icon="good-job-o"
          :badge="comment.popularity"
          @click="like()"
        ></van-tabbar-item
        ><van-tabbar-item class="star" @click="collect()"
          ><van-icon  v-if="show" name="star-o" /><van-icon
            v-else
            name="star" /></van-tabbar-item
        ><van-tabbar-item 
          ><van-icon class="star" name="share-o" @click="showShare = true"/><van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
        /></van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="divv"></div>
  </div>
</template>

<script>
export default {
  methods: {
    getDetailsList(id) {
      this.axios.get(`/story/${id}`).then((re) => {
        console.log("re===>", re);
        this.story = re.data.story;
      });
      this.axios.get(`/story/${id}/extra`).then((re) => {
        console.log("re2==>", re);
        this.comment = re.data;
      });
    },
    change(id) {
      this.$router.push("/cate/" + id);
      // console.log(id);
    },
    collect: function () {
      if (this.show) {
        this.show = false;
        this.$toast("已收藏");
      } else {
        this.show = true;
        this.$toast("取消收藏");
      }
    },
    like: function () {
      if (this.isClick == 0) {
        this.isClick = 1;
        this.comment.popularity = this.comment.popularity + 1;
        // this.badge = this.badge + 1;
        this.$toast.success("点赞成功");
      } else {
        this.isClick = 0;
        this.comment.popularity = this.comment.popularity - 1;
        this.$toast("已取消点赞");
      }
    },
    onSelect(option) {
      this.$Toast(option.name);
      this.showShare = false;
    },
  },
  data() {
    return {
      // homeList: {},
      // topStories: [],
      // stories: [],
      id: "",
      story: {},
      // clickNum:3,
      isClick: "",
      badge: [],
      comment: {},
      show: true,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
    };
  },

  props: {
    detaid: {
      type: String,
      return: 0,
    },
  },
  watch: {
    // id改变 动态获取数据
    detaid() {
      this.getDetailsList(this.detaid);
      console.log(this.detaid);
    },
  },
  created() {
    console.log(this.detaid);
    // 页面加载,初始化数据
    this.getDetailsList(this.detaid);
  },
};
</script>

<style scoped>
@import url("http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3");
::v-deep .img-place-holder {
  height: 0px;
}
::v-deep .view-more a {
  background-color: #0066ff;
  color: white;
  border-radius: 20px;
}
.tab {
  height: 3vh;
}
.tab .van-tabbar .van-tabbar-item:nth-child(1) {
  border-right: 1px solid rgb(216, 214, 214);
  height: 4vh;
  margin-top: 1vh;
  padding-top: 0.5vh;
}
.top {
  position: relative;
}
.star {
  /* font-weight: 700; */
  font-size: 20px;
  margin-bottom: 1.5vh;
}
.text {
  width: 100vw;
  height: 55vw;

  font-size: 20px;
  position: absolute;
  bottom: 1%;
  color: white;
}
.text h3 {
  width: 85vw;
  position: absolute;
  top: 50%;
  font-size: 24px;
  margin-left: 5vw;
}
.divv {
  height: 6vh;
}
</style>