<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <span>{{ step.payAccount }}</span>
      </a-form-item>
      <a-form-item
        label="付款密码"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款密码' }]
            }
          ]"
          type="password"
          palceholder="请输入付款密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button @click="jumpBefore">上一步</a-button>
        <a-button type="primary" @click="handleSubmmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmmit() {
      const { form, $store } = this;
      form.validateFields(err => {
        if (!err) {
          $store.dispatch({
            type: "form/submitStepForm",
            payload: $store.state.form.step
          });
        }
      });
    },
    jumpBefore() {
      this.$router.push("/form/step-form/info");
    }
  }
};
</script>

<style></style>
