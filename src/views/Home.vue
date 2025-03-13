<template>
  <div class="py-6">
    <div class="max-w-2xl mx-auto">
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold">Welcome to the Rainmaker Toolbox!</h1>
              <p class="mt-2 text-gray-600">Select a tool to get started:</p>
            </div>
            <ul class="mt-8">
              <li v-for="tool in tools" :key="tool.name" class="flex items-center p-4 mb-4 bg-gray-50 rounded-lg shadow hover:bg-blue-50 transition">
                <span class="material-icons mr-3 text-blue-600">{{ tool.icon }}</span>
                <router-link :to="tool.path" class="text-lg font-medium text-blue-600 hover:underline">
                  {{ tool.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tools: [
        {
          name: "Phone Number Cleaner",
          path: "/phone-parser",
          icon: "phone",
        },
        {
          name: "Last Name Cleaner",
          path: "/last-name-cleaner",
          icon: "edit",
        },
        {
          name: "Text Lowercaser",
          path: "/text-lowercaser",
          icon: "text_format",
        }
      ]
    };
  }
}
</script> 