const baseUrl = 'http://localhost:5192/api/Name';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            persons: [],
            filteredPersons: []
        };
    },
    methods: {
        filterPersons() {
            if (!this.searchQuery) {
                this.filteredPersons = this.persons; // Show all persons if search query is empty
                return;
            }

            axios.get(`${personBaseUrl}/search`, { params: { searchTerm: this.searchQuery } })
                .then(response => {
                    this.filteredPersons = response.data; // Set filtered persons to the result from the stored procedure
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    },
    created() {
        axios.get(baseUrl)
            .then(response => {
                this.persons = response.data;  // Assuming this returns the full list
                this.filteredPersons = this.persons;  // Initialize with the full list
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}).mount('#app');

