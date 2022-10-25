<template>
    <div>
        <h4 class="title">菜品分类</h4>
        <div class="box-contont">
            
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first',
            classify: [
                {
                    className: '家常饭',
                }, {
                    className: '川菜',
                }, {
                    className: '粤菜',
                }, {
                    className: '东北菜',
                },
            ],
            abc: 0,
        };
    },


    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        activeInedx(i) {
            this.abc = i
        }
    },
};
</script>
<style scoped>
.box-classify {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
}

.box {
    display: flex;
    justify-content: space-around;

}

.text-classify {
    background-color: #409EFF;

}

.pp {
    width: 150px;
    border: 1px solid red;
    padding: 5px 10px;
    color: #fff;
    border-radius: 10px;
}
.title{
    color: white;
}
.box-contont {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    height: 100%;
    padding: 15px;
}
</style>