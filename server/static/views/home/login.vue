<template>
    <div class="login-background">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h1>
                <span class="title">积木系统</span>
                <span class="version">v{{version}}</span>
            </h1>
            <el-form-item prop="account">
                <el-input type="text" v-model="userForm.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="userForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {sStorage, ENUM} from '../../js/util.js'
import pkg from '../../../../package.json'
export default {
    data() {
        return {
            logining: false,
            version: pkg.version,
            userForm: {
                account: '',
                checkPass: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        handleReset() {
            this.$refs.userForm.resetFields();
        },
        handleSubmit(ev) {
            var _this = this;
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    var loginParams = { username: this.userForm.account, password: this.userForm.checkPass };
                    this.socket.emit('login', loginParams, res => {
                        if (res.status === 200) {
                            sStorage.set(ENUM.ss.TOKEN, res.data)
                            this.socket.token = res.data.token;
                            this.$router.push('/index');
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {
        sessionStorage.clear();
    }
}

</script>

<style lang="scss" scoped>
.login-background {
    background: url('../../images/login_back.jpg') left top no-repeat;
    background-size: cover;
    height: 100%;
}



.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: transparent;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;
    top: 180px;
    h1 {
        margin: 0px auto 30px auto;
        text-align: center;
        .title {
            font-size: 40px;
            color: #f35626;
            background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-animation: hue 30s infinite linear;
        }
        .version {
            font-size: 12px;
            color: #505458;
        }
    }
    @keyframes hue {
        from {
            -webkit-filter: hue-rotate(0deg);
        }

        to {
            -webkit-filter: hue-rotate(-360deg);
        }
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
}
</style>