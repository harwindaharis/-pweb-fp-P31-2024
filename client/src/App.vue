<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

// State untuk toggle menu
const isMenuOpen = ref(false);

// Ambil token dan role dari localStorage
const token = localStorage.getItem("token");
const role = localStorage.getItem("role"); // Role: "admin" atau "user"

// Fungsi untuk toggle menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Fungsi untuk logout
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login"; // Redirect ke halaman login
};
</script>

<template>
  <nav class="bg-white shadow-md py-6 px-10 flex justify-between items-center">
    <!-- Logo -->
    <div class="flex items-center">
      <img src="../public/Logonavbar.svg" alt="wcare" class="h-8 mr-4" />
    </div>

    <!-- Navigasi Desktop -->
    <div class="hidden sm:flex flex-1 justify-center space-x-4">
      <RouterLink
        to="/"
        :class="`hover:text-blue-400 font-bold ${$route.path === '/' ? 'text-blue-400' : 'text-gray-700'}`"
      >
        Home
      </RouterLink>
      <a href="#feedback" class="text-gray-700 hover:text-blue-400 font-bold">
        Feedback
      </a>
      <RouterLink
        to="/news"
        :class="`hover:text-blue-400 font-bold ${$route.path === '/news' ? 'text-blue-400' : 'text-gray-700'}`"
      >
        News
      </RouterLink>
      <RouterLink
        to="/crowdfund"
        class="text-gray-700 hover:text-blue-400 font-bold"
      >
        Crowdfund
      </RouterLink>

      <!-- Tambahkan link Admin Dashboard jika user adalah admin -->
      <RouterLink
        v-if="role === 'admin'"
        to="/admin"
        class="text-gray-700 hover:text-blue-400 font-bold"
      >
        Admin Dashboard
      </RouterLink>
    </div>

    <!-- Login/Logout dan Profil -->
    <div class="hidden sm:flex items-center space-x-4">
      <template v-if="token">
        <button
          @click="handleLogout"
          class="bg-blue-400 text-white px-4 py-2 rounded-3xl hover:bg-blue-500"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <RouterLink to="/login">
          <button
            class="bg-blue-400 text-white px-4 py-2 rounded-3xl hover:bg-blue-500"
          >
            Login
          </button>
        </RouterLink>
      </template>
    </div>

    <!-- Tombol Menu Mobile -->
    <div class="sm:hidden">
      <button @click="toggleMenu" class="text-gray-700 focus:outline-none">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </div>
  </nav>

  <!-- Navigasi Mobile -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden transition-opacity duration-300 ease-in-out"
    :class="{ 'opacity-100': isMenuOpen, 'opacity-0': !isMenuOpen }"
    @click="toggleMenu"
  ></div>

  <div
    class="fixed top-0 right-0 w-full h-full bg-white shadow-md z-50 sm:hidden transform transition-transform duration-300 ease-in-out"
    :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
  >
    <div class="px-10 py-6 flex justify-between items-center border-b">
      <img src="../public/Logonavbar.svg" alt="wcare" class="h-8" />
      <button @click="toggleMenu" class="text-gray-700 focus:outline-none">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
    <div class="px-8 py-6 space-y-4">
      <RouterLink
        to="/"
        :class="`hover:text-blue-400 block font-bold ${$route.path === '/' ? 'text-blue-400' : 'text-gray-700'}`"
        @click="toggleMenu"
      >
        Home
      </RouterLink>
      <a
        href="#feedback"
        class="block text-gray-700 hover:text-blue-400"
        @click="toggleMenu"
      >
        Feedback
      </a>
      <RouterLink
        to="/news"
        :class="`hover:text-blue-400 block font-bold ${$route.path === '/news' ? 'text-blue-400' : 'text-gray-700'}`"
        @click="toggleMenu"
      >
        News
      </RouterLink>
      <RouterLink
        to="/crowdfund"
        class="block text-gray-700 hover:text-blue-400 font-bold"
        @click="toggleMenu"
      >
        Crowdfund
      </RouterLink>

      <!-- Link Admin Dashboard untuk mobile -->
      <RouterLink
        v-if="role === 'admin'"
        to="/admin"
        class="block text-gray-700 hover:text-blue-400 font-bold"
        @click="toggleMenu"
      >
        Admin Dashboard
      </RouterLink>

      <!-- Tombol Login/Logout -->
      <button
        v-if="token"
        @click="handleLogout"
        class="block w-full bg-blue-400 text-white px-4 py-2 rounded-3xl hover:bg-blue-500 mt-4"
      >
        Logout
      </button>
      <RouterLink v-else to="/login" @click="toggleMenu">
        <button
          class="block w-full bg-blue-400 text-white px-4 py-2 rounded-3xl hover:bg-blue-500 mt-4"
        >
          Login
        </button>
      </RouterLink>
    </div>
  </div>

  <!-- Main Content -->
  <RouterView />
</template>
