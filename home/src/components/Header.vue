<template>
    <div class="ickt_header">
        <span>
            <slot name="left_arrow"></slot>
        </span>
        <span>
            <!-- 把title传递给父组件 -->
            <slot name="linkTitle" :title="title"></slot>
        </span>
        <span class="right_login">
            <slot name="right_login">登录</slot>
        </span>
    
    </div>
</template>

<style lang="scss">
// 引入base.scss
@import '@/base.scss';
// 头部组件样式
.ickt_header {
    position: sticky;
    top: 0;
    z-index: 1;
    background: $greenColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    height: 50px;
    font-size: 22px;
}
// 左箭头
.left_arrow {
    position: relative;
    // 白色三角形
    &:before,&:after {
        content: '';
        @include trangleArrow(10px,white,right);
        position:absolute;
        top:-8px;
        left:10px;
    }
    // 绿色三角形
    &:after {
        @include trangleArrow(10px,$greenColor,right);
        left:12px;
    }
}
// 登录部分
.right_login {
    font-size: 16px;
    margin-right: 10px;
}
</style>
<script>
export default {
    data() {
        return {
            title:'ICKT团购官网',
            
        }
    }
}
</script>