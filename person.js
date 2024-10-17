const baseUrl = 'http://localhost:5192/api/Name';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            persons: [],
            filteredPersons: [],
            personToEdit: null, // Holds the person being edited
            Newperson: { nconst: '', primaryName: '', birthYear: '', deathYear: '', primaryProfession: '', knownForTitles: '' }
        };
    },
    methods: {
        fetchPersons() {
            axios.get(baseUrl)
                .then(response => {
                    this.persons = response.data; // Assuming this returns the full list
                    this.filteredPersons = this.persons; // Initialize with the full list
                })
                .catch(error => console.error('Error fetching persons:', error));
        },
        filterPersons() {
            if (!this.searchQuery) {
                this.filteredPersons = this.persons; // Show all persons if search query is empty
                return;
            }
            axios.get(`${baseUrl}/search`, { params: { searchTerm: this.searchQuery } })
                .then(response => {
                    this.filteredPersons = response.data; // Update filtered persons based on search
                })
                .catch(error => console.error('Error fetching data:', error));
        },
        createPerson() {
            axios.post(baseUrl, this.Newperson) // Make sure your API supports POST requests to create a person
                .then(response => {
                    this.persons.push(response.data); // Add the newly created person to the list
                    this.filteredPersons.push(response.data); // Also add to filteredPersons
                    this.resetForm(); // Clear the form
                })
                .catch(error => console.error('Error creating person:', error));
        },
        editPerson(person) {
            this.personToEdit = { ...person }; // Create a copy of the person to edit
        },
        updatePerson() {
            axios.put(`${baseUrl}/${this.personToEdit.nconst}`, this.personToEdit) // Update API endpoint
                .then(() => {
                    this.fetchPersons(); // Refresh the list after updating
                    this.personToEdit = null; // Clear the edit form
                })
                .catch(error => console.error('Error updating person:', error));
        },
        deletePerson(nconst) {
            axios.delete(`${baseUrl}/${nconst}`) // Update API endpoint
                .then(() => {
                    this.fetchPersons(); // Refresh the list after deleting
                })
                .catch(error => console.error('Error deleting person:', error));
        },
        resetForm() {
            this.Newperson = { nconst: '', primaryName: '', birthYear: '', deathYear: '', primaryProfession: '', knownForTitles: '' }; // Reset Newperson data
            this.personToEdit = null; // Clear the edit form
        }
    },
    created() {
        this.fetchPersons(); // Fetch persons on component creation
    }
}).mount('#app');



