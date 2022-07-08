<template>
  <footer class="p-0">
    <div
      class="w-full px-4 py-2 flex spacpe-x-2 h-35 bg-[#27262c] items-center border-header text-white dark:bg-[#1c1c28] border-t dark:border-[#6f6e84] "
    >
      <router-link class="font-bold " :to="{ name: 'home', params: {} }">
        conduit
      </router-link>
      <span class="text-white ml-2">
        An interactive learning project from
        <a rel="noopener noreferrer" target="blank" href="https://thinkster.io"
          >Thinkster</a
        >. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>
