<template>
  <!-- 给一个跟标签 -->
  <div>
    <div class="max">
      <div class="bar">
        <div class="left">
          <ul class="uls">
            <li>{{ date }}</li>
            <li>{{ month }}月</li>
          </ul>
        </div>
        <div class="right">
          <ul class="uls1">
            <li>{{tiems}}</li>
            <li><img class="pop" src="../assets/head.jpg" /></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 定义数据的地方
  created() {
    this.axios.get("/stories/latest").then((re) => {
      console.log(re);
      var time = new Date();
      var hours = time.getHours();
      if( hours >= 6 && hours <= 11){
        this.tiems = "早上好！";
      }else if( hours > 11 && hours <= 13){
        this.tiems = "中午好！";
      }else if( hours > 13 && hours <= 17){
        this.tiems = "下午好！";
      }else if( hours > 17 && hours <= 24){
        this.tiems = "晚上好！";
      }else{
        this.tiems = "凌晨了";
      }
      this.month = this.months[time.getMonth()];
      this.date = time.getDate();
    });
  },
  data() {
    return {
      tiems:"",
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
      date: "",
    };
  },
};
</script>


// style css样式
// scoped 能够阻止本页面的css样式影响到其他页面
<style scoped>
.max{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: white;
}
.bar {
  width: 100vw;
  height: 13vw;

  display: flex;
  /* background-color: rgb(71, 70, 70); */
  color: black;
  z-index: 8;
}
.left {
  width: 15vw;
  height: 9vw;
  border-right: 1px solid rgb(208, 205, 205);
  margin-top: 2vw;
  text-align: center;
}
.uls li:nth-child(1) {
  font-weight: 700;
  font-size: 18px;
}
.uls li:nth-child(2) {
  font-size: 10px;
}
.right {
  width: 75vw;
  height: 10vw;
  /* border: 1px solid red; */
  margin-top: 1.5vw;
  margin-left: 2vw;
}
.uls1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2vw;
  font-size: 20px;
}
.uls1 li:nth-child(2) {
  width: 8vw;
  height: 8vw;
  /* border: 1px solid red; */
  border-radius: 50%;
  margin-top: -1vw;
  overflow: hidden;
  box-shadow: 1px 1px black;
}
.uls1 li:nth-child(1) {
  margin-top: -0.5vw;
}
.pop {
  width: 100%;
  height: 100%;
}
</style>