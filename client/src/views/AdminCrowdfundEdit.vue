<template>
    <div class="container mx-auto mt-10 px-4">
      <h1 class="text-3xl font-bold text-center mb-6">Edit Crowdfund</h1>
      <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <form @submit.prevent="editCrowdfund" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2" for="name">Nama Crowdfund</label>
            <input
              id="name"
              v-model="crowdfund.name"
              type="text"
              placeholder="Nama Crowdfund"
              class="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2" for="target">Target Donasi</label>
            <input
              id="target"
              v-model="crowdfund.target"
              type="number"
              placeholder="Target Donasi"
              class="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-2" for="status">Status Crowdfund</label>
            <select
              id="status"
              v-model="crowdfund.status"
              class="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-400"
            >
              <option value="open">Open</option>
              <option value="close">Close</option>
            </select>
          </div>
  
          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="deleteCrowdfund"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete Crowdfund
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        crowdfund: {
          name: '',
          target: 0,
          status: 'open',
        },
      };
    },
    async mounted() {
      try {
        const response = await fetch(`http://localhost:3000/api/crowdfunds/${this.$route.params.crowdfund_id}`);
        const data = await response.json();
        this.crowdfund = data;
      } catch (error) {
        console.error('Failed to fetch crowdfund data:', error);
      }
    },
    methods: {
      async editCrowdfund() {
        try {
          await fetch(`http://localhost:3000/api/crowdfunds/${this.$route.params.crowdfund_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.crowdfund),
          });
          this.$router.push('/admin');
        } catch (error) {
          console.error('Failed to edit crowdfund:', error);
        }
      },
      async deleteCrowdfund() {
        try {
          await fetch(`http://localhost:3000/api/crowdfunds/${this.$route.params.crowdfund_id}`, {
            method: 'DELETE',
          });
          this.$router.push('/admin');
        } catch (error) {
          console.error('Failed to delete crowdfund:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  label {
    color: #4b5563;
  }
  
  input,
  select {
    border: 1px solid #d1d5db;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
  
  button {
    transition: background-color 0.2s ease-in-out;
  }
  </style>
  