<template>
    <div class="">
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            修改名单
        </el-button>

        <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
            <span>{{msg}}</span>
        </el-drawer>
    </div>
</template>


<script>
export default {
    name: 'RandomCheckIn',
    data() {
        return {
            drawer: true,
            direction: 'rtl',
            msg: 'Welcome to Your Vue.js App  CheckIn'
        }
    },
    created() {
        const storedData = localStorage.getItem('CheckInStuList');
        if (storedData) {
            this.CheckInStuList = JSON.parse(storedData);
        } else {
            this.hasList = false;
        }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>