<template>
    <div class="">

        <div shadow="always" class="flexBodyName">
            <div v-for="(name, index) in bottomShow" :key="index" class="botton-list">
                <el-button size="small" :class="{ 'round-color': name.isActive, 'botton-list': true }" @click=""> {{
                    name.text }}</el-button>
            </div>
        </div>


        <el-drawer title="修改名单" :visible.sync="drawer" :direction="direction" :before-close="handleDrawerClose"
            :size="'50%'">
            <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{ tag }}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button ref="addTag" v-else class="button-new-tag" size="small" @click="showInput"
                @keyup.enter.native="showInput">
                + 新增
            </el-button>
            <el-button @click="cleanData" size="small" type="primary"
                style="margin-left: 16px; display: flex; position: fixed; bottom: 2%; right: 10%;"> 清空
            </el-button>
        </el-drawer>


        <el-button @click="drawer = true" type="primary" class="change">
            修改名单
        </el-button>

        <!-- 需要防抖 -->
        <el-button v-debounce:5000="handleRandomCheck" type="primary" class="start">
            开始点名
        </el-button>

        <el-button v-debounce:5000="resetCheck" type="primary" class="reset">
            重置点名
        </el-button>

    </div>
</template>


<script>
export default {
    name: 'RandomCheckIn',
    data() {
        return {
            dynamicTags: [], // 所有名单
            notCheckSutList: [], // 未点到名单
            alreadyCheckedList: [], // 已点到的名单
            inputVisible: false,
            inputValue: '',
            drawer: false,
            direction: 'btt',
            colorIndex: 0,
            bottomShow: [],
            intervalId: null,
            curStudent: ''
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
            this.dynamicTags = [];
        }
        this.bottomShow = [];
        this.dynamicTags.forEach(item => this.bottomShow.push({ text: item, isActive: false }));

        this.notCheckSutList = [];
        this.dynamicTags.forEach(item => this.notCheckSutList.push(item)); // 初始化为点名为完整名单
        this.alreadyCheckedList = []; // 初始化已点名为空
    },
    mounted() {
        // 在mounted钩子中添加事件监听
        window.addEventListener('keyup', this.handleKeyUp);
    },
    beforeDestroy() {
        // 在组件销毁前移除事件监听
        window.removeEventListener('keyup', this.handleKeyUp);
    },
    methods: {
        toggleButton(index) {
            this.bottomShow.forEach((btn, i) => {
                btn.isActive = i === index
            })
            // 已选中的标记按钮点亮
            this.alreadyCheckedList.forEach(item => {
                for (let i = 0; i < this.bottomShow.length; ++i) {
                    if (this.bottomShow[i].text == item) {
                        this.bottomShow[i].isActive = true;
                    }
                }
            })
        },
        handleDrawerClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    
                    localStorage.setItem('checkInStuList', JSON.stringify(this.dynamicTags));
                    this.bottomShow = [];
                    this.dynamicTags.forEach(item => this.bottomShow.push({ text: item, isActive: false }));

                    /// 重置点名
                    this.notCheckSutList = [];
                    this.dynamicTags.forEach(item => this.notCheckSutList.push(item)); // 初始化为点名为完整名单
                    this.alreadyCheckedList = []; // 初始化已点名为空
                    done();
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

        cleanData() {
            this.$confirm('确认清空？')
                .then(_ => {
                    
                    console.log("开始清空..." + this.bottomShow)
                    this.dynamicTags = [];
                    this.bottomShow = [];
                    this.notCheckSutList = [];
                    this.alreadyCheckedList = [];
                    localStorage.setItem('checkInStuList', JSON.stringify(this.dynamicTags));
                    console.log("清空结束..." + this.bottomShow);
                    done();
                })
                .catch(_ => { });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        async handleRandomCheck() {
            console.log("开始")

            if (this.notCheckSutList.length <= 0) {
                this.resetCheck();
                alert('所有同学都已点到！');
                return;
            }

            // 开始
            let lastIndex = 0;
            let currentIndex = 0;
            this.intervalId = setInterval(() => {
                this.toggleButton(currentIndex);
                lastIndex = currentIndex;
                currentIndex = (currentIndex + 1) % this.bottomShow.length;

            }, 50); // 每秒轮询一次

            await new Promise(resolve => setTimeout(resolve, 1000));

            // 停止
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            this.bottomShow[lastIndex].isActive = false;


            // 随机选中人员
            const randomIndex = Math.floor(Math.random() * this.notCheckSutList.length);
            this.curStudent = this.notCheckSutList[randomIndex];
            this.alreadyCheckedList.push(this.curStudent);
            this.notCheckSutList.splice(randomIndex, 1); // 标记已点名

            // 已选中的标记按钮点亮
            this.alreadyCheckedList.forEach(item => {
                for (let i = 0; i < this.bottomShow.length; ++i) {
                    if (this.bottomShow[i].text == item) {
                        this.bottomShow[i].isActive = true;
                    }
                }
            })


            console.log(this.notCheckSutList);
            console.log(this.alreadyCheckedList);
        },

        // 重置所有点名清单
        resetCheck() {
            this.notCheckSutList = [];
            this.dynamicTags.forEach(item => this.notCheckSutList.push(item)); // 初始化为点名为完整名单
            this.alreadyCheckedList = []; // 初始化已点名为空

            // 已选中的标记按钮点亮
            this.notCheckSutList.forEach(item => {
                for (let i = 0; i < this.bottomShow.length; ++i) {
                    if (this.bottomShow[i].text == item) {
                        this.bottomShow[i].isActive = false;
                    }
                }
            })
        },
        handleKeyUp(event) {
            // 检查按键是否是回车键
            if (event.keyCode === 13) {
                this.showInput();
            }
        },
    },

    directives: {
        debounce: {
            inserted(el, binding) {
                let timeout;
                el.addEventListener("click", () => {
                    if (timeout) clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        binding.value();
                    }, binding.args || 500);
                })
            }
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

.button-clean {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    margin-bottom: 10%;
    padding-top: 10;
    padding-bottom: 10;
}

/* 点名器主面板 */
.flexBodyName {
    width: 80%;
    margin: auto;
    background-color: #d3d7db;
    padding: 10px;
    /* flex 布局 */
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    /* grid 布局 */
    /* display: grid;
    grid-template-columns: repeat(6, 1fr); */
    /* 每行3个组件 */
    grid-gap: 10px;
    /* 格子间隔 */

    /* 边框阴影 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 0;
    position: absolute;
    top: 30%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.change {
    display: flex;
    position: fixed;
    bottom: 10%;
    right: 10%;
    margin-left: 15px;
    box-shadow: 0 2px 4px rgba(233, 222, 222, 0.842), 0 0 6px rgba(233, 219, 219, 0.877);
    border: #d3d7db;
}

.start {
    display: flex;
    position: fixed;
    bottom: 10%;
    right: 25%;

    margin-left: 15px;
    margin-right: 45px;
    background-color: #e25b0d;
    box-shadow: 0 2px 4px rgba(233, 222, 222, 0.842), 0 0 6px rgba(233, 219, 219, 0.877);
    border: #d3d7db;
}

.reset {
    display: flex;
    position: fixed;
    bottom: 10%;
    right: 15%;

    margin-right: 60px;
    background-color: #c0dee2;
    box-shadow: 0 2px 4px rgba(233, 222, 222, 0.842), 0 0 6px rgba(233, 219, 219, 0.877);
    border: #d3d7db;
}

.round-color {
    background-color: #e25b0d;
    color: #f7faf2;
}

.botton-list {
    width: 100px;
    justify-content: center;
    align-items: center;
}
</style>