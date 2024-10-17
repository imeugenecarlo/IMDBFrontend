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
                // Show only the first 20 titles if the search query is empty
                this.filteredTitles = this.titles.slice(0, 20);
                return;
            }

            axios.get(`${baseUrl}/search`, { params: { searchTerm: this.searchQuery } })
                .then(response => {
                    this.filteredTitles = response.data.slice(0, 20); // Limit search results to 20
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    },

    created() {
        axios.get(baseUrl)
            .then(response => {
                this.titles = response.data;  // Assuming this returns the full list
                this.filteredTitles = this.titles.slice(0, 20);  // Show only the first 20 initially
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}).mount('#app');