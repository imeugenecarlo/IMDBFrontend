const baseUrl = 'http://localhost:5192/api/Title';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            titles: [],
            filteredTitles: [],
        };
    },
    methods: {
        filterMovies() {
            if (!this.searchQuery) {
                this.filteredTitles = this.titles; // Show all titles if search query is empty
                return;
            }

            axios.get(`${titleUrl}/search`, { params: { searchTerm: this.searchQuery } })
                .then(response => {
                    this.filteredTitles = response.data; // Set filtered titles to the result from the stored procedure
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    },

    created() {
        axios.get(baseUrl)
            .then(response => {
                this.titles = response.data;  // Assuming this returns the full list
                this.filteredTitles = this.titles;  // Initialize with the full list

            })
            .catch(error => console.error('Error fetching data:', error));

    }
}).mount('#app');