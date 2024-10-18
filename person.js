const baseUrl = 'http://localhost:5192/api/Name';

Vue.createApp({
    data() {
        return {
            searchQuery: '',
            persons: [],
            filteredPersons: [],
            personToEdit: null,
            Newperson: { nconst: '', primaryName: '', birthYear: '', deathYear: '', primaryProfession: '', knownForTitles: '' },
            loading: false // Add this line to track loading state
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
            if (!this.isValidForm()) {
                console.error('Form is invalid');
                return;
            }
    
            this.loading = true;
    
            const personData = {
                ...this.Newperson,
                deathYear: this.Newperson.deathYear || null // Send null if deathYear is 0 or empty
            };
    
            axios.post(baseUrl, personData)
                .then(response => {
                    this.persons.push(response.data);
                    this.filteredPersons.push(response.data);
                    this.resetForm();
                })
                .catch(error => {
                    console.error('Error creating person:', error);
                    alert('An error occurred while creating the person. Please try again.');
                })
                .finally(() => {
                    this.loading = false;
                });
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
        },
        isValidForm() {
            const isNconstValid = this.Newperson.nconst.trim() !== '';
            const isPrimaryNameValid = this.Newperson.primaryName.trim() !== '';
            const isBirthYearValid = Number.isInteger(this.Newperson.birthYear); // Just check if it's an integer
            const isPrimaryProfessionValid = this.Newperson.primaryProfession.trim() !== '';
        
            console.log(`Nconst valid: ${isNconstValid}`);
            console.log(`Primary Name valid: ${isPrimaryNameValid}`);
            console.log(`Birth Year valid: ${isBirthYearValid}`);
            console.log(`Primary Profession valid: ${isPrimaryProfessionValid}`);
        
            return isNconstValid && isPrimaryNameValid && isBirthYearValid && isPrimaryProfessionValid;
        }
        


    },
    created() {
        this.fetchPersons(); // Fetch persons on component creation
    }
}).mount('#app');



