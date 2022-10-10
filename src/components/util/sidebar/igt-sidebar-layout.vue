<template>
  <div>
    <div class="flex h-screen bg-csp-gray-400 dark:bg-csp-gray font-roboto">
      <div :class="sidebarOpen ? 'block' : 'hidden'" @click="sidebarOpen = false"
           class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"></div>

      <div :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
           class="fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white dark:bg-csp-blue overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 shadow-xl">
        <div class="flex items-center justify-center my-4">
            <img width="102" height="102" :src="require(`@/assets/crystal-shine.png`)" alt="logo">
        </div>
        <div class="flex items-center justify-center mt-2">
          <span class="text-gray-800 dark:text-white text-xl font-semibold text-center">{{ title }}</span>
        </div>


        <nav class="flex flex-col mt-3 px-4 text-left">

          <a class="flex flex-row w-full justify-between items-center tab-entry dark:text-white" :key="'tab-'+index"
             v-for="(tab, index) in tabs"
             :class="{ 
                'bg-csp-grass text-white': tab.isActive,
                'bg-csp-orange text-black': !tab.isCategory && !tab.isActive && tab.isAlert,
                'hover:text-gray-700 hover:bg-gray-200 cursor-pointer dark:hover:text-gray-700': !tab.isCategory && !tab.isActive,
              }"
             :href="tab.link" target="_blank"
             @click="tab.canSelect ? selectTab(tab) : ''"
          >

            <div v-if="tab.isCategory" class="w-full mt-8 mb-4 text-sm text-left" :key="'tab'+index">
              {{ tab.name }}
              <hr/>
            </div>
            <span v-else-if="!tab.canSelect">???</span>
            <span v-else>{{ tab.name }}</span>
            <img v-if="tab.image" class="w-8 h-8" :src="require('@/assets/' +tab.image)" :alt="tab.image"/>

          </a>

        </nav>
      </div>

      <div class="flex-1 flex flex-col ml-5 overflow-hidden">
        <header class="flex justify-between items-center p-3">
          <div class="flex items-center space-x-4 lg:space-x-0">
            <button @click="sidebarOpen = true"
                    class="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </header>

        <main class="flex-1 overflow-x-auto overflow-y-auto">
          <div class="container w-full h-5/6">
            <div
                class="grid place-items-start text-gray-500 dark:text-gray-300 text-xl h-full border-4 border-gray-300 shadow-md">
              <div class="w-full h-fit">
                <h1 v-if=activeTab class="p-3 text-2xl font-medium text-gray-800 dark:text-white">{{ activeTab.name }}</h1>
                <slot></slot>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "igt-sidebar",
  data() {
    return {
      sidebarOpen: true,
      darkMode: true,
      dropdownOpen: true,
      tabs: [],
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  computed: {
    activeTab() {
      return this.tabs.find(tab => {
        return tab.isActive;
      });
    },
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name);
      });
      if(selectedTab.isAlert == true){
        selectedTab.setAlert(false);
      }
    }
  }

}
</script>

<style scoped>
.tab-entry {
  @apply mt-1 p-2 text-sm text-gray-600 rounded w-full h-10;
}
</style>
