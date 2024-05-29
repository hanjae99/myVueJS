<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences"
          >Load Submitted Experiences</base-button
        >
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && err">{{ err }}</p>
      <p v-else-if="!isLoading && (!results || results.length === 0)">No stored Experience data.</p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      err: null
    };
  },
  methods: {
    loadExperiences() {
      this.isLoading = true;
      this.err = null;

      fetch(
        'https://vue-http-demo-f55da-default-rtdb.firebaseio.com/surveys.json'
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const resResults = [];

          for (const id in data) {
            resResults.push({
              id,
              name: data[id].name,
              rating: data[id].rating,
            });
          }

          this.results = resResults;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.err = 'Failed to fetch data. try again later.';
          this.isLoading = false;
        })
    },
  },
  mounted() {
    this.loadExperiences();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
