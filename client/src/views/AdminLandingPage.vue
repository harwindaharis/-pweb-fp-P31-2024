<template>
    <main class="container">
      <h1 class="title">Crowdfund List</h1>
      <div class="table-container">
        <table class="crowdfund-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Target</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="crowdfund in crowdfunds" :key="crowdfund.id">
              <td>{{ crowdfund.id }}</td>
              <td>{{ crowdfund.name }}</td>
              <td>{{ crowdfund.target }}</td>
              <td :class="{ open: crowdfund.status === 'open', closed: crowdfund.status === 'closed' }">
                {{ crowdfund.status }}
              </td>
              <td>
                <RouterLink
                  :to="`/admin/${crowdfund.id}`"
                  class="btn btn-detail"
                >
                  Detail
                </RouterLink>
                <RouterLink
                  :to="`/admin/${crowdfund.id}/edit`"
                  class="btn btn-edit"
                >
                  Edit
                </RouterLink>
                <button @click="deleteCrowdfund(crowdfund.id)" class="btn btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </template>
  
  ---
  
  <script>
  export default {
    data() {
      return {
        crowdfunds: [],
      };
    },
    async mounted() {
      try {
        const response = await fetch('http://localhost:3000/api/crowdfunds');
        if (!response.ok) throw new Error('Failed to fetch crowdfunds');
        const data = await response.json();
        this.crowdfunds = data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    methods: {
      async deleteCrowdfund(id) {
        try {
          const response = await fetch(`http://localhost:3000/api/crowdfunds/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete crowdfund');
          this.crowdfunds = this.crowdfunds.filter((item) => item.id !== id);
        } catch (error) {
          console.error('Error deleting crowdfund:', error);
        }
      },
    },
  };
  </script>
  
  ---
  
  <style scoped>
  .container {
    font-family: 'Inter', sans-serif;
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
  
  .table-container {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .crowdfund-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  }
  
  .crowdfund-table thead {
    background-color: #f3f4f6;
  }
  
  .crowdfund-table th,
  .crowdfund-table td {
    text-align: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .crowdfund-table th {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: #6b7280;
  }
  
  .crowdfund-table tbody tr:hover {
    background-color: #f9fafb;
  }
  
  .open {
    color: #22c55e;
    font-weight: bold;
  }
  
  .closed {
    color: #ef4444;
    font-weight: bold;
  }
  
  .btn {
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    margin-right: 4px;
    text-decoration: none;
    text-align: center;
  }
  
  .btn-detail {
    background-color: #3b82f6;
    color: white;
  }
  
  .btn-edit {
    background-color: #facc15;
    color: white;
  }
  
  .btn-delete {
    background-color: #ef4444;
    color: white;
  }
  
  .btn:hover {
    filter: brightness(0.9);
  }
  </style>
  