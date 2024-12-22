<template>
	<div>
		<h1>Available Crowdfunds</h1>
		<div v-for="crowdfund in crowdfunds" :key="crowdfund._id" class="crowdfund-item">
			<h3>{{ crowdfund.name }}</h3>
			<p>Target: {{ crowdfund.target }}</p>
			<router-link :to="`/crowdfund/${crowdfund._id}`">View Details</router-link>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			crowdfunds: [],
		};
	},
	async created() {
		const response = await axios.get("/api/crowdfund");
		this.crowdfunds = response.data;
	},
};
</script>
