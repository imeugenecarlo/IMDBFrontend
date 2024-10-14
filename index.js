const baseUrl = 'http://localhost:3000/titles';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            titles: [
                {
                    titleId: 'tt1234567',
                    titleType: 'movie',
                    primaryTitle: 'Example Movie',
                    originalTitle: 'Example Movie Original',
                    isAdult: 0,
                    startYear: 2023,
                    endYear: '\\N',
                    runtimeMinutes: 120,
                    genres: 'Action, Drama'
                }
                // Add more example movie objects here if needed
            ],
            filteredTitles: []
        };
    },
    methods: {
        filterMovies() {
            this.filteredTitles = this.titles.filter(title => {
                return Object.values(title).some(value =>
                    String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            });
        }
    },
    created() {
        this.filteredTitles = this.titles; // Initialize with example data
        axios.get(baseUrl)
            .then(response => {
                this.titles = response.data.data;
                this.filteredTitles = this.titles;
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}).mount('#app');