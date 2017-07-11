<template>
    <div class="login-background">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">积木系统
                <span>v 0.0.1</span>
            </h3>
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
import {sStorage} from '../../js/util.js'
export default {
    data() {
        return {
            logining: false,
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
                            sStorage.set('token', res.data)
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

h3 span {
    font-size: 12px;
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
    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
        font-size: 30px;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
}
</style>