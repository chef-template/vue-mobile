<style>
    .wrap{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
    }
    .main{
        position: relative;
        flex: 1;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .main::-webkit-scrollbar{
        display: none;
    }
</style>

<template>
    <div class="wrap">
        <slot name="header"></slot>
        <main class="main">
            <slot></slot>
        </main>
        <slot name="footer"></slot>
        <slot name="overlay"></slot>
    </div>
</template>
