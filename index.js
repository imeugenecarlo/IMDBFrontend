const baseUrl = 'http://localhost:5192/api/Title';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            titles: [],
            filteredTitles: [],
            newTitle: {
                tconst: '',
                titleType: '',
                primaryTitle: '',
                originalTitle: '',
                isAdult: false, // Default to false for checkbox
                startYear: '',
                endYear: '',
                runtimeMinutes: '',
                genres: ''
            }
        };
    },
    methods: {
        filterMovies() {
            if (!this.searchQuery) {
                this.filteredTitles = this.titles.slice(0, 20);
                return;
            }
            axios.get(`${baseUrl}/search`, { params: { searchTerm: this.searchQuery } })
                .then(response => {
                    this.filteredTitles = response.data.slice(0, 20);
                })
                .catch(error => console.error('Error fetching data:', error));
        },
        addTitle() {
            const processedTitle = {
                tconst: this.newTitle.tconst,
                titleType: this.newTitle.titleType,
                primaryTitle: this.newTitle.primaryTitle,
                originalTitle: this.newTitle.originalTitle,
                isAdult: this.newTitle.isAdult === true, // Ensure it's a boolean
                startYear: parseInt(this.newTitle.startYear) || null,
                endYear: this.newTitle.endYear ? parseInt(this.newTitle.endYear) || null : null,
                runtimeMinutes: parseInt(this.newTitle.runtimeMinutes) || null,
                genres: this.newTitle.genres
            };

            console.log('Processed Title:', processedTitle); // Log for debugging

            axios.post(baseUrl, processedTitle)
                .then(response => {
                    this.titles.push(response.data);
                    this.filteredTitles = this.titles.slice(0, 20);
                    // Reset input fields
                    this.newTitle = {
                        tconst: '',
                        titleType: '',
                        primaryTitle: '',
                        originalTitle: '',
                        isAdult: false,
                        startYear: '',
                        endYear: '',
                        runtimeMinutes: '',
                        genres: ''
                    };
                })
                .catch(error => console.error('Error adding title:', error));
        },
        deleteTitle(tconst) {
            axios.delete(`${baseUrl}/${tconst}`)
                .then(() => {
                    this.titles = this.titles.filter(title => title.tconst !== tconst);
                    this.filteredTitles = this.titles.slice(0, 20);
                })
                .catch(error => console.error('Error deleting title:', error));
        }
    },
    created() {
        axios.get(baseUrl)
            .then(response => {
                this.titles = response.data;
                this.filteredTitles = this.titles.slice(0, 20);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}).mount('#app');

