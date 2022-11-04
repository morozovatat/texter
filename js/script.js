const App = {
    data: () => ({
        title: 'Texter',
        titlePlaceholder: 'Enter the title...',
        editorPlaceholder: '... and body',
        labelsPlaceholder: 'Add labels maybe?',
        searchPlaceholder: 'Looking for something?',
        titleValue: '',
        notes: [],
        editorIsActive: false,
        wantedValue: '',
        currentId: 0,
        labels: new Set(),
        label: ''
    }
    ),
    methods: {
        openEditor() {
            this.editorIsActive = true
        },
        closeEditor() {
            this.editorIsActive = false
        },
        addNewNote() {
            if (this.titleValue !== '' && tinymce.activeEditor.getContent() !== '') {
                this.currentId++
                this.notes.push({ title: this.titleValue, body: tinymce.activeEditor.getContent(), isOpen: false, id: this.currentId, labels: new Set(this.labels) })
                this.titleValue = ''
                tinymce.activeEditor.setContent('')
                this.labels.clear()
            }
        },
        addLabel() {
            this.labels.add(this.label)
            this.label = ''
            console.log(this.labels)
        },
        openNote(id) {
            this.notes.find(note => note.id === id).isOpen = !this.notes.find(note => note.id === id).isOpen
        },
        editNote(id) {
            this.openEditor()
            let currentNote = this.notes.find(note => note.id === id)
            this.titleValue = currentNote.title
            tinymce.activeEditor.setContent(currentNote.body)
            this.labels = new Set(currentNote.labels)
            this.removeNote(id)
        },
        removeNote(id) {
            this.notes.splice(this.notes.findIndex(note => note.id === id), 1)
        }
    },
    computed: {
        searchedNotes() {
            if (this.wantedValue !== '') {
                return this.notes.filter(note => note.title.includes(this.wantedValue) || note.body.includes(this.wantedValue))
            }
            return this.notes
        }
    }
}

const app = Vue.createApp(App)
app.mount('#app')