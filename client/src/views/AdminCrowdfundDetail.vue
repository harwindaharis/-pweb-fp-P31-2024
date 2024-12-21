<template>
    <main class="container">
      <h1 class="title">Crowdfund Details</h1>
      <div class="card">
        <div class="detail">
          <label>Nama Crowdfund:</label>
          <p>{{ crowdfund.name }}</p>
        </div>
        <div class="detail">
          <label>Target Donasi:</label>
          <p>{{ crowdfund.target }}</p>
        </div>
        <div class="detail">
          <label>Status:</label>
          <p :class="{ open: crowdfund.status === 'open', closed: crowdfund.status === 'closed' }">
            {{ crowdfund.status }}
          </p>
        </div>
        <div class="detail">
          <label>Total Donasi Saat Ini:</label>
          <p>{{ crowdfund.current_donation }}</p>
        </div>
      </div>

      <section class="comments">
        <h2>Komentar</h2>
        <div v-if="comments.length > 0" class="comment-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div>
              <strong>{{ comment.user }}</strong>
              <p>{{ comment.message }}</p>
            </div>
            <button @click="deleteComment(comment.id)" class="btn btn-delete">
              Hapus
            </button>
          </div>
        </div>
        <p v-else class="no-comments">Belum ada komentar.</p>
      </section>
  
      <div class="actions">
        <button @click="deleteCrowdfund" class="btn btn-danger">Hapus Crowdfund</button>
        <RouterLink :to="`/admin/${crowdfund.id}/edit`" class="btn btn-edit">
          Edit Crowdfund
        </RouterLink>
      </div>
    </main>
  </template>
  
  ---
  
  <script>
  export default {
    data() {
      return {
        crowdfund: {
          name: '',
          target: 0,
          status: '',
          current_donation: 0,
        },
        comments: [],
      };
    },
    async mounted() {
      const id = this.$route.params.crowdfund_id;
  
      if (!id) {
        console.error('Crowdfund ID tidak ditemukan di URL.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:3000/api/crowdfunds/${id}`);
        if (!response.ok) throw new Error('Failed to fetch crowdfund data');
        const data = await response.json();
        this.crowdfund = data;
  
        const commentsResponse = await fetch(
          `http://localhost:3000/api/crowdfunds/${id}/comments`
        );
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
        const commentsData = await commentsResponse.json();
        this.comments = commentsData;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    methods: {
      async deleteComment(commentId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/comments/${commentId}`,
            { method: 'DELETE' }
          );
          if (!response.ok) throw new Error('Failed to delete comment');
          this.comments = this.comments.filter((c) => c.id !== commentId);
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      },
      async deleteCrowdfund() {
        const id = this.$route.params.crowdfund_id;
  
        try {
          const response = await fetch(`http://localhost:3000/api/crowdfunds/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete crowdfund');
          this.$router.push('/admin');
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
    max-width: 800px;
    padding: 1.5rem;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .detail {
    margin-bottom: 1rem;
  }
  
  .detail label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .detail p {
    color: #555;
  }
  
  .open {
    color: #22c55e;
  }
  
  .closed {
    color: #ef4444;
  }
  
  .comments {
    margin-top: 2rem;
  }
  
  .comment-list {
    max-height: 200px;
    overflow-y: auto;
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
  }
  
  .comment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9fafb;
    padding: 0.5rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }
  
  .no-comments {
    text-align: center;
    color: #9ca3af;
  }
  
  .actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .btn-danger {
    background: #ef4444;
    color: white;
  }
  
  .btn-edit {
    background: #facc15;
    color: white;
  }
  </style>
  