<template>
    <div class="input_outter">
            <input type="text" :placeholder="placeholder" v-model="searchValue" @keyup.enter="inputSearchWord">
    </div>
</template>

<style lang="scss">
    .input_outter {
        background: #fff;
        padding: 10px;
        height: 40px;
        input {
        display: block;
        margin: auto;
        width:90%;
        height: 100%;
        border: none;
        outline: none;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 20px;
        background: #efefef;
    }
    }
    
</style>

<script>
export default {
    props: ['value','placeholder','sendSearchWord'],
    data() {
        return {
            searchValue: ''
        }
    },
    methods: {
        inputSearchWord() {
            // 执行父组件传递的自定义方法sendSearchWord 把绑定的数据 就是搜索词传递给父组件List
            this.sendSearchWord(this.searchValue);
        }
    }
}
</script>