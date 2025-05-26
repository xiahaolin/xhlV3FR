<script setup>
  import { RouterView } from "vue-router";
  import { dealUrlSearchParams } from "@/tools/index";
  import useLoginStore from "@/stores/login";

  import { onMounted } from "vue";
  const loginStore = useLoginStore();
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    const _routeParams = dealUrlSearchParams(window.location.href);
    console.log(_routeParams, "_routeParams");
  });
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped lang="less"></style>
