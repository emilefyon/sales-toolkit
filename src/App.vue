<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white shadow">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <router-link to="/" class="text-xl font-bold flex items-center">
          <span class="material-icons mr-2">build</span>
          Rainmaker Toolbox 💰 🛠️
        </router-link>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <router-link to="/" class="hover:text-blue-200 transition">Home</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="container mx-auto p-4">
      <router-view />
    </main>
    <footer class="bg-gray-200 py-4 mt-8">
      <div class="container mx-auto px-4 text-center text-gray-600">
        &copy; {{ new Date().getFullYear() }} Rainmaker Toolbox
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script> 