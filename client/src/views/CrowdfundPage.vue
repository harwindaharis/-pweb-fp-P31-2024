<template>
    <main class="container">
      <h1 class="title">Crowdfund Management</h1>
      
      <nav class="crowdfund-nav">
        <button @click="activeSection = 'list'" :class="{'active': activeSection === 'list'}">Crowdfund List</button>
        <button @click="activeSection = 'create'" :class="{'active': activeSection === 'create'}">Create Crowdfund</button>
        <button @click="activeSection = 'detail'" :class="{'active': activeSection === 'detail'}">View Detail</button>
        <button @click="activeSection = 'edit'" :class="{'active': activeSection === 'edit'}">Edit Crowdfund</button>
      </nav>

      <section v-if="activeSection === 'list'" class="section">
        <AdminLandingPage />
      </section>

      <section v-if="activeSection === 'create'" class="section">
        <AdminCrowdfundCreate />
      </section>

      <section v-if="activeSection === 'detail'" class="section">
        <AdminCrowdfundDetail />
      </section>

      <section v-if="activeSection === 'edit'" class="section">
        <AdminCrowdfundEdit />
      </section>
    </main>
  </template>
  
  <script>
  import AdminLandingPage from '@/views/AdminLandingPage.vue';
  import AdminCrowdfundCreate from '@/views/AdminCrowdfundCreate.vue';
  import AdminCrowdfundDetail from '@/views/AdminCrowdfundDetail.vue';
  import AdminCrowdfundEdit from '@/views/AdminCrowdfundEdit.vue';
  
  export default {
    name: 'CrowdfundPage',
    components: {
      AdminLandingPage,
      AdminCrowdfundCreate,
      AdminCrowdfundDetail,
      AdminCrowdfundEdit,
    },
    data() {
      return {
        activeSection: 'list',
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin: 2rem auto;
    max-width: 1200px;
    padding: 1.5rem;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .crowdfund-nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .crowdfund-nav button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid #ddd;
    background-color: #f9fafb;
  }
  
  .crowdfund-nav button.active {
    background-color: #3b82f6;
    color: white;
  }
  
  .section {
    margin-top: 2rem;
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  