<template>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Target</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crowdfund in crowdfunds" :key="crowdfund.id">
          <td>{{ crowdfund.name }}</td>
          <td>{{ crowdfund.target }}</td>
          <td>{{ crowdfund.status }}</td>
          <td>
            <router-link :to="`/admin/${crowdfund.id}`">View</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      crowdfunds: {
        type: Array,
        required: true,
      },
    },
  };
  </script>  