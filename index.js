const baseUrl = 'http://localhost:5192/api/Title';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            titles: [],
            filteredTitles: [],
            newTitle: {  // Object to hold new title information
                tconst: '',
                titleType: '',
                primaryTitle: '',
                originalTitle: '',
                isAdult: '',
                startYear: '',
                endYear: '',
                runtimeMinutes: '',
                genres: ''
            }
        };
    },
    methods: {
        // Filter movies based on search query
        filterMovies() {
            if (!this.searchQuery) {
                // Show the first 20 titles if no search query
                this.filteredTitles = this.titles.slice(0, 20);
                return;
            }

            // Perform search
            axios.get(`${baseUrl}/search`, { params: { searchTerm: this.searchQuery } })
                .then(response => {
                    this.filteredTitles = response.data.slice(0, 20); // Show only the first 20 results
                })
                .catch(error => console.error('Error fetching data:', error));
        },

        // Add a new title to the list and the API
        addTitle() {
            axios.post(baseUrl, this.newTitle)
                .then(response => {
                    // Add the new title to the titles array
                    this.titles.push(response.data);
                    this.filteredTitles = this.titles.slice(0, 20);  // Update the displayed list

                    // Clear the form after adding
                    this.newTitle = {
                        tconst: '',
                        titleType: '',
                        primaryTitle: '',
                        originalTitle: '',
                        isAdult: '',
                        startYear: '',
                        endYear: '',
                        runtimeMinutes: '',
                        genres: ''
                    };
                })
                .catch(error => console.error('Error adding title:', error));
        },

        // Delete a title from the list and the API
        deleteTitle(tconst) {
            axios.delete(`${baseUrl}/${tconst}`)
                .then(() => {
                    // Remove the deleted title from the array
                    this.titles = this.titles.filter(title => title.tconst !== tconst);
                    this.filteredTitles = this.titles.slice(0, 20);  // Update the displayed list
                })
                .catch(error => console.error('Error deleting title:', error));
        }
    },

    created() {
        // Fetch all titles when the component is created
        axios.get(baseUrl)
            .then(response => {
                this.titles = response.data;  // Store the full list of titles
                this.filteredTitles = this.titles.slice(0, 20);  // Show only the first 20 initially
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}).mount('#app');
