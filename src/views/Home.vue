// eslint-disable vue/no-use-v-if-with-v-for
<template>
  <div id="container">
    <el-menu class="aside" router :default-active="currentRouteName">
      <template #default>
        <template v-for="route in routes">
          <el-submenu
            v-if="hasChildren(route)"
            :key="route.name"
            :index="route.name">
            <template #title>
              <span>{{ route.meta.label }}</span>
            </template>
            <el-menu-item
              v-for="childRoute in route.children"
              :key="childRoute.name"
              :index="childRoute.name"
              :route="childRoute">
              {{ childRoute.meta.label }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else
            :key="route.name"
            :index="route.name"
            :route="route">
            {{ route.meta.label }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <div class="content-container">
      <transition name="el-fade-in-linear">
        <router-view class="content" />
      </transition>
    </div>
  </div>
</template>

<script>
import { routes } from '@/routes/routes';
export default {
  data() {
    return {
      routes,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    hasChildren(route) {
      return Array.isArray(route.children) && route.children.length;
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  height: inherit;
  display: flex;
  .aside {
    height: inherit;
  }
  .content-container {
    height: inherit;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    .content {
      padding: 16px;
      height: inherit;
      width: inherit;
      overflow: auto;
    }
  }
}
</style>
