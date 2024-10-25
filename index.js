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
                startYear: "",
                endYear: "",
                runtimeMinutes: "",
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
            axios.post(baseUrl, processedTitle)
                .then(response => {
                    this.titles.push({ ...response.data, isEditing: false });
                    this.filteredTitles = this.titles.slice(0, 20);
                    this.resetNewTitle();
                })
                .catch(error => console.error('Error adding title:', error));
        },
        toggleEditMode(title) {
            title.isEditing = !title.isEditing;
        },
        updateTitle(title) {
            axios.put(`${baseUrl}/${title.tconst}`, title)
                .then(response => {
                    const index = this.titles.findIndex(t => t.tconst === title.tconst);
                    this.titles[index] = { ...response.data, isEditing: false };
                    this.filteredTitles = this.titles.slice(0, 20);
                })
                .catch(error => console.error('Error updating title:', error));
        },
        deleteTitle(tconst) {
            axios.delete(`${baseUrl}/${tconst}`)
                .then(() => {
                    this.titles = this.titles.filter(title => title.tconst !== tconst);
                    this.filteredTitles = this.titles.slice(0, 20);
                })
                .catch(error => console.error('Error deleting title:', error));
        },
        resetNewTitle() {
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
        }
    },
    created() {
        axios.get(baseUrl)
            .then(response => {
                this.titles = response.data.map(title => ({ ...title, isEditing: false }));
                this.filteredTitles = this.titles.slice(0, 20);
            })
            .catch(error => console.error('Error fetching titles:', error));
    }
}).mount('#app');
