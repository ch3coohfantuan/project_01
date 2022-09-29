<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="/#/login" target="_blank">登录</a>
        </span>
      </h3>
      <div class="form">
        <el-form
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              type="text"
              placeholder="请输入你的手机号"
              v-model="ruleForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              type="text"
              placeholder="请输入验证码"
              v-model="ruleForm.code"
            ></el-input>
            <el-button type="primary" @click="getCode">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              type="password"
              autocomplete="off"
              placeholder="请输入你的登录密码"
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password1">
            <el-input
              type="password"
              autocomplete="off"
              placeholder="请输入确认密码"
              v-model="ruleForm.password1"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="userRegister">完成注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        code: "",
        password: "",
        password1: "",
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号长度为 11 个字符",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度为 6-15 个字符",
            trigger: "blur",
          },
        ],
        password1: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getCode() {
      try {
        const { phone } = this.ruleForm;
        phone && (await this.$store.dispatch("user/getCode", phone));
        this.ruleForm.code = this.$store.state.user.code;
      } catch (error) {
        alert(error.message);
      }
    },
    userRegister() {
      const { phone, code, password } = this.ruleForm;
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          alert("你的信息有误，请重新填写!");
          return false;
        }
        let result = await this.$store.dispatch("user/userRegister", {
          phone,
          code,
          password,
        });
        if (result) {
          alert("注册成功!");
          this.$router.push("/login");
        } else {
          alert("注册过程中出现了点小问题，请重新尝试!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 50%;
  height: 100%;
  margin: 50px auto;
}
.el-input {
  width: 300px;
}
.el-button {
  width: 100px;
  height: 38px;
  margin-left: 15px;
}
.register-container {
  .register {
    width: 1200px;
    height: 430px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>