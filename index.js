const baseUrl = 'http://localhost:5192/api/Title';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            titles: [],
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
        // TEMPORARY: Add some hardcoded test data
        this.titles = [
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
            },
            {
                titleId: 'tt7654321',
                titleType: 'series',
                primaryTitle: 'Example Series',
                originalTitle: 'Example Series Original',
                isAdult: 0,
                startYear: 2020,
                endYear: 2023,
                runtimeMinutes: 45,
                genres: 'Drama, Sci-Fi'
            }
        ];
    
        this.filteredTitles = this.titles; // Initialize filtered titles with the test data
    
        // Uncomment when ready to fetch data from the API
        
    
        axios.get(baseUrl)
            .then(response => {
                this.titles = response.data;  // Use response.data if the list is not nested
                this.filteredTitles = this.titles;  // Initialize the filtered titles with the full list
            })
            .catch(error => console.error('Error fetching data:', error));

        
    }
    
}).mount('#app');