<template>
    <div class="set-account">
        <div class="header title">修改密码</div>
        <div class="flex-sp_a box-set-pass">
            <div class="main mg-20">
                <div class="old-pass posi-rela">
                    <input type="text" placeholder="请输入原来的密码" v-model="form.oldPass">
                    <span class="bottom"></span>
                    <span class="right"></span>
                    <span class="top"></span>
                    <span class="left"></span>
                </div>
                <div class="new-pass posi-rela mt-20">
                    <input type="text" placeholder="请输入新的密码" v-model="form.newPass">
                    <span class="bottom"></span>
                    <span class="right"></span>
                    <span class="top"></span>
                    <span class="left"></span>
                </div>
                <div class="new-pass posi-rela mt-20">
                    <input type="text" placeholder="请再次输入新的密码" v-model="form.againNewPass">
                    <span class="bottom"></span>
                    <span class="right"></span>
                    <span class="top"></span>
                    <span class="left"></span>
                </div>
                <div class="flex-center">
                  <button class="update-btn mt-20" @click="onUpdate">确定修改</button>
                  <div></div>
                </div>
            </div>
        </div>
    </div>  
    
</template>

<style scoped>
.header {
    font-size: 18px;
}

.posi-rela {
    position: relative;
}

input {
    width: 400px;
    color: rgb(0, 0, 0);
    font-size: inherit;
    font-family: inherit;
    padding: 0.35em 0.45em;
    border: 1px solid transparent;
    transition: background-color 0.3s ease-in-out;
}

input:focus {
    outline: none;
}

input::placeholder {
    color: hsla(0, 0%, 0%, 0.6);
}

span {
    position: absolute;
    background-color: #3cefff;
    transition: transform 0.5s ease;
}

.bottom,
.top {
    height: 1px;
    left: 0;
    right: 0;
    transform: scaleX(0);
}

.left,
.right {
    width: 1px;
    top: 0;
    bottom: 0;
    transform: scaleY(0);
}

.bottom {
    bottom: 0;
    transform-origin: bottom right;
}

input:focus~.bottom {
    transform-origin: bottom left;
    transform: scaleX(1);
}

.right {
    right: 0;
    transform-origin: top right;
}

input:focus~.right {
    transform-origin: bottom right;
    transform: scaleY(1);
}

.top {
    top: 0;
    transform-origin: top left;
}

input:focus~.top {
    transform-origin: top right;
    transform: scaleX(1);
}

.left {
    left: 0;
    transform-origin: bottom left;
}

input:focus~.left {
    transform-origin: top left;
    transform: scaleY(1);
}

.update-btn {
    z-index: 1;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    color: rgb(0, 0, 0);
    padding: 0.5em 1em;
    outline: none;
    border: none;
    overflow: hidden;
    transition: color 0.4s ease-in-out;
}

.update-btn::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: #3cefff;
    transform-origin: center;
    transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
    transition: transform 0.45s ease-in-out;
}

.update-btn:hover {
    cursor: pointer;
    color: #161616;
}

.update-btn:hover::before {
    transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
}

.box-set-pass {
    margin: 15px 30px;
    transition: all 0.2s ease-in-out;
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0px 1.6px 3.6px rgb(0 0 0 / 13%), 0px 0px 2.9px rgb(0 0 0 / 11%);
}
</style>

<script>
import { updatePassApi } from '@/api/api';
export default {
    data() {
        return {
            form: {
                oldPass: '',
                newPass: '',
                againNewPass: '',
            },
            isActiveold:false,
            isActivepas:false,
            isActiveagapas:false,
            lastPassword: ''
        }
    },
    created() {
    },
    methods: {
        onUpdate() {
            this.validate();
            if (this.isActiveold == true && this.isActivepas == true && this.isActiveagapas == true) {
                updatePassApi({
                    "password": this.form.newPass
                }).then(res => {
                    console.log(res);
                    if (res.data.status == 1) {
                        this.$message({
                            type: "success",
                            message: res.data.msg,
                        });
                    }
                })
            }
        },
        validate() {
            let { oldPass, newPass, againNewPass } = this.form;
            let sessionPass = sessionStorage.getItem('password');
            if (!oldPass.length) {
                this.$message({
                    type: "warning",
                    message: "旧密码不能为空！",
                });
            } else if (this.form.oldPass != sessionPass) {
                this.$message({
                    type: "warning",
                    message: "旧密码错误！",
                });
                return this.isActiveold = false;
            }else{
                this.isActiveold = true;
            }
            if (!newPass.length) {
                this.$message({
                    type: "warning",
                    message: "新密码不能为空！",
                });
            } else if (newPass.length < 6) {
                this.$message({
                    type: "warning",
                    message: "新密码长度应该在6-15位之间！",
                });
            }else{
                this.isActivepas = true
            }
            if (newPass != againNewPass) {
                this.$message({
                    type: "warning",
                    message: "俩次输入密码不一致",
                });
                return this.isActiveagapas = false;
            }else{
                this.isActiveagapas = true
            }
        }

    }
}
</script>