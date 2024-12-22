<template>
	<div>
		<h1>{{ crowdfund.name }}</h1>
		<p>Target: {{ crowdfund.target }}</p>
		<form @submit.prevent="submitDonation">
			<label for="method">Payment Method:</label>
			<select v-model="paymentMethod" id="method">
				<option value="QRIS">QRIS</option>
				<option value="Transfer">Transfer</option>
			</select>
			<div v-if="paymentMethod === 'Transfer'">
				<label for="bank">Bank Name:</label>
				<input type="text" v-model="bankName" id="bank" />
			</div>
			<label for="amount">Amount:</label>
			<input type="number" v-model="amount" id="amount" />
			<button type="submit">Donate</button>
		</form>
		<button @click="addToFavorites">Add to Favorites</button>
		<form @submit.prevent="submitComment">
			<label for="comment">Comment:</label>
			<input type="text" v-model="comment" id="comment" />
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			crowdfund: {},
			paymentMethod: "QRIS",
			bankName: "",
			amount: 0,
			comment: "",
		};
	},
	async created() {
		const response = await axios.get(`/api/crowdfund/${this.$route.params.crowdfund_id}`);
		this.crowdfund = response.data;
	},
	methods: {
		async submitDonation() {
			await axios.post(`/api/crowdfund/${this.$route.params.crowdfund_id}/donate`, {
				method: this.paymentMethod,
				bankName: this.bankName,
				amount: this.amount,
			});
			this.$router.push(`/crowdfund/${this.$route.params.crowdfund_id}/success`);
		},
		async addToFavorites() {
			await axios.post(`/api/crowdfund/${this.$route.params.crowdfund_id}/favorite`);
			alert("Added to favorites");
		},
		async submitComment() {
			await axios.post(`/api/crowdfund/${this.$route.params.crowdfund_id}/comment`, {
				message: this.comment,
			});
			alert("Comment submitted");
		},
	},
};
</script>
