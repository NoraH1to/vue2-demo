<template>
  <el-form ref="form" :model="formData" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio v-model="formData.sex" label="1">男</el-radio>
      <el-radio v-model="formData.sex" label="2">女</el-radio>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input-number v-model="formData.age"></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
import control from './mixins/control';

export default {
  mixins: [control({ name: undefined, sex: '1', age: undefined })],
};
</script>
