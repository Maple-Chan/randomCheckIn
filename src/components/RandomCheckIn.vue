<template>
    <div class="">
        
        <div shadow="always" class="flexBodyName">
            <div v-for = "name in dynamicTags">
                <el-button size = "small"> {{ name  }}</el-button>
            </div>
        </div>



        <el-drawer title="修改名单" :visible.sync="drawer" :direction="direction" :before-close="handleDrawerClose">
            <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{ tag }}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
            <el-button @click="cleanData" size = "small" type="primary" style="margin-left: 16px; position: absolute; bottom: 10%; right: 40%"> 清空 </el-button>
        </el-drawer>

        <el-button @click="drawer = true" type="primary" style="margin-left: 16px; position: absolute; bottom: 10%; right: 10%;">
            修改名单
        </el-button>

        <el-button @click="handleRandomCheck" type="primary" class="start">
            开始点名
        </el-button>
    </div>
</template>


<script>
export default {
    name: 'RandomCheckIn',
    data() {
        return {
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            drawer: false,
            direction: 'rtl',
            msg: 'Welcome to Your Vue.js App  CheckIn'
        }
    },
    created() {
        const storedData = localStorage.getItem('checkInStuList');
        // 解析浏览器存储数据
        this.dynamicTags = JSON.parse(storedData);
        // 控制抽屉开关（若无数据默认打开）
        if (this.dynamicTags && this.dynamicTags.length > 0) {
            this.drawer = false;
        } else {
            this.drawer = true;
        }
    },
    methods: {
        handleDrawerClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    localStorage.setItem('checkInStuList', JSON.stringify(this.dynamicTags));
                })
                .catch(_ => { });
        },

        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        cleanData(){
            this.dynamicTags = [];
            localStorage.setItem('checkInStuList', JSON.stringify(this.dynamicTags));
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        handleRandomCheck(){
            const cnt = this.dynamicTags.length;
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


.el-tag+.el-tag {
    margin-left: 10px;
    margin: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    height: 32px;
}

.button-clean{
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    margin-bottom: 10%;
    padding-top: 10;
    padding-bottom: 10;
}

/* 点名器主面板 */
.flexBodyName {
	width: 70%;
	margin: auto;
	background-color: #d3d7db;
	padding: 10px;
	/* flex 布局 */
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	/* 边框阴影 */
	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
.start{
    margin-left: 16px; position: absolute; bottom: 10%; right: 20%;
    background-color: #e25b0d;
    box-shadow: 0 2px 4px rgba(233, 222, 222, 0.842), 0 0 6px rgba(233, 219, 219, 0.877);
    border: #d3d7db;
}
</style>