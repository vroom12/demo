

<template>
  <div class="about">
    <div class="title">
      <ul class="uls">
        <li class="leftbtn">
          <van-icon name="arrow-left" @click="back(cateid)" />
        </li>
        <li class="righttitle">{{ comment.comments }}条评论</li>
      </ul>
    </div>
    <div class="max">
    <div class="long_comments" v-if="comment.long_comments > 0">
      <h3 class="h3_1">{{ comment.long_comments }}条长评</h3>
      <div class="details" v-for="(item, index) in long_comments" :key="index">
        <div class="left">
          <img :src="item.avatar" class="img" />
        </div>
        <div class="right">
          <div class="author">
            <h3>{{ item.author }}</h3>

            <van-icon name="ellipsis" />
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="icons">
            <span class="time">{{ item.time | showTime }}</span>
            <ul class="uls1">
              <li @click="like1(item.id)"><span v-if="item.good">{{item.likes}}<van-icon v-if="item.good" name="good-job-o" /></span><span v-else>{{item.likes}}<van-icon  name="good-job" /></span></li>
              <li><van-icon name="comment-o" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
    <div class="short_comments">
      <h3 class="h3_1">{{ comment.short_comments }}条短评</h3>
      <div class="details" v-for="(item, index) in short_comments" :key="index">
        <div class="left">
          <img :src="item.avatar" class="img" />
        </div>
        <div class="right">
          <div class="author">
            <h3>{{ item.author }}</h3>

            <van-icon name="ellipsis" />
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="icons">
            <span class="time">{{ item.time | showTime }}</span>
            <ul class="uls1">
              <li @click="like(item.id)"><span v-if="item.good">{{item.likes}}<van-icon v-if="item.good" name="good-job-o" /></span><span v-else>{{item.likes}}<van-icon  name="good-job" /></span></li>
              <li><van-icon  name="comment-o" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p>已显示全部评论</p>
    </div>
    <div class="bottom1">
      
      <div class="imgHead">
        <img class="pho" src="../assets/head.jpg">
        </div>
      <van-cell-group>
        <van-field v-model="value" placeholder="说说你的看法" />
      </van-cell-group>
    </div>
    <div class="diiv"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  
    back(cateid) {
      this.$router.push("/detalis/" + cateid);
      // console.log(id);
    },
    like (ids){
        for (var i = 0; i < this.short_comments.length;i++){
          if(this.short_comments[i].id == ids) {
            this.short_comments[i].good = !this.short_comments[i].good
            if(this.short_comments[i].good == false){
              this.short_comments[i].likes +=1
            }else{
              this.short_comments[i].likes -=1
            }
            this.short_comments.splice(i,1,this.short_comments[i])
          }
          
        }
    },
    like1 (ids){
        for (var i = 0; i < this.long_comments.length;i++){
          if(this.long_comments[i].id == ids) {
            this.long_comments[i].good = !this.long_comments[i].good
            if(this.long_comments[i].good == false){
              this.long_comments[i].likes +=1
            }else{
              this.long_comments[i].likes -=1
            }
            this.long_comments.splice(i,1,this.long_comments[i])
          }
          
        }
    },
    getDetailsList(id) {
      this.axios.get(`/story/${id}/short-comments`).then((re) => {
        console.log("re1==>", re);
        this.short_comments = re.data.comments;
        for(var i = 0; i < this.short_comments.length; i++){
          this.short_comments[i].good = true;
        }
      });
    },
    getDetails2List(id) {
      this.axios.get(`/story/${id}/extra`).then((re) => {
        console.log("re2==>", re);
        this.comment = re.data;
      });
    },
    getDetails3List(id) {
      this.axios.get(`/story/${id}/long-comments`).then((re) => {
        console.log("re3==>", re);
        this.long_comments = re.data.comments;
        this.reply_to = re.data.comments.reply_to;
        for(var i = 0; i < this.long_comments.length; i++){
          this.long_comments[i].good = true;
        }
      });
    },
  },
  data() {
    return {
      id: "",
      short_comments: {},
      comment: {},
      value: "",
      long_comments: {},
      
    };
  },

  props: {
    cateid: {
      type: String,
      retutn: 0,
    },
  },
  watch: {
    // id改变 动态获取数据
    cateid() {
      this.getDetailsList(this.cateid);
      this.getDetails2List(this.cateid);
      this.getDetails3List(this.cateid);
      console.log(this.cateid);
    },
  },
  created() {
    console.log(this.cateid);
    // 页面加载,初始化数据
    this.getDetailsList(this.cateid);
    this.getDetails2List(this.cateid);
    this.getDetails3List(this.cateid);
  },
  filters: {
    showTime(value) {
      function addZero(index) {
        return index < 10 ? "0" + index : index;
      }
      var time = new Date(value * 1000);
      var month = addZero(time.getMonth() + 1);
      var day = addZero(time.getDate());
      var hour = addZero(time.getHours());
      var minute = addZero(time.getMinutes());
      return month + "-" + day + " " + hour + ":" + minute;
    },
  },
};
</script>

<style scoped>
.title {
  width: 100vw;
  border-bottom: 1px solid rgb(234, 232, 232);
  background-color: white;
  position: fixed;
  top: 0px;
  z-index: 9;
}
.max{
  position: absolute;
  top:12vw;
  left:2.5vw ;
}
.uls {
  display: flex;
  /* border: 1px solid red; */
  height: 12vw;
  justify-content: space-between;
}
.righttitle {
  width: 20vw;
  /* border: 1px solid red; */
  margin: 0 auto;
  line-height: 12vw;
  font-weight: 700;
  font-size: 18px;
}
.leftbtn {
  width: 5vw;
  line-height: 12vw;
  /* border: 1px solid red; */
  padding-left: 2vw;
}
.short_comments {
  width: 95vw;
  margin: 0 auto;
}
.long_comments {
  width: 95vw;
  margin: 0 auto;
}
.details {
  width: 94vw;
  display: flex;
  margin-top: 3vw;
  justify-content: space-between;
  border-bottom: 1px solid rgb(232, 230, 230);
}
.h3_1 {
  /* border: 1px solid red; */
  height: 10vw;
  line-height: 10vw;
}
.left {
  width: 9vw;
  height: 9vw;
  /* border: 1px solid red; */
  border-radius: 50%;
  overflow: hidden;
}
.img {
  width: 100%;
  height: 100%;
}
.author {
  display: flex;
  justify-content: space-between;
}
.icons {
  display: flex;
  justify-content: space-between;
}
.uls1 {
  display: flex;
}
.right {
  width: 82vw;
  /* border: 1px solid red; */
}
.content {
  margin-top: 1vw;
  font-size: 14px;
}
.time {
  font-size: 14px;
  color: rgb(213, 211, 211);
}
.uls1 li {
  margin-left: 10vw;
  font-size: 14px;
}
.bottom {
  width: 30vw;
  /* border: 1px solid red; */
  margin: 0 auto;
  color: rgb(213, 211, 211);
}
.bottom1{
  width: 100vw;
  height: 7vh;
  position: fixed;
  bottom: 0px;
  /* border: 1px solid red; */
  left: 0px;
  background-color: white;
  display: flex;
}
.imgHead{
  width: 7vw;
  height: 7vw;
  border-radius: 50%;;
  overflow: hidden;
  margin-left: 4vw;
  margin-top: 1.5vw;
}
.pho{
  width: 100%;
  height: 100%;
}

.diiv{
  height: 7vh;
}
</style>