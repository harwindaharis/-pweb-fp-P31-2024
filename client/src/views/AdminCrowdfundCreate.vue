<template>
    <Toaster />
    <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Create New Crowdfund</h2>
      <form @submit.prevent="handleCreate">
        <label>Name:</label>
        <input v-model="name" class="input-field" placeholder="Crowdfund Name" />
        
        <label>Target:</label>
        <input v-model="target" type="number" class="input-field" placeholder="Target Amount" />
        
        <label>Status:</label>
        <select v-model="status" class="input-field">
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        
        <button type="submit" class="btn-primary">Create Crowdfund</button>
      </form>
    </div>
  </template>
  
  <script>
  import { Toaster, toast } from "@steveyuowo/vue-hot-toast";
  import { createCrowdfund } from '@/api/crowdfund';
  
  export default {
    components: { Toaster },
    data() {
      return { name: '', target: '', status: 'Open' };
    },
    methods: {
      async handleCreate() {
        try {
          await createCrowdfund({ name: this.name, target: this.target, status: this.status });
          toast.success('Crowdfund Created Successfully!');
          this.$router.push('/crowdfund');
        } catch (error) {
          toast.error('Failed to create crowdfund.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-primary {
    background-color: #3b82f6;
    color: white;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  