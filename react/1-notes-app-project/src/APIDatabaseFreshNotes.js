import localforage from "localforage";
export default class DBNotes {

    static database = "databaseApp";
    static tableDbNotes = localforage.createInstance({
        name: this.database,
        storeName: "notes",
        description: "Notes of the user",
    });

    static tableDbArchives = localforage.createInstance({
        name: this.database,
        storeName: "archives",
        description: "Archives of the user",
    });

    static async getStartData() {
        return this.getNotesFromDB()
            .then(async (notes) => {
                notes.sort((a, b) => (b.positionDate - a.positionDate))
                const archives = await this.getArchivesFromDB();
                archives.sort((a, b) => (a.positionDate - b.positionDate))
                return [notes, archives];
            })
    }

    static async getNotesFromDB() {
        const listFromDB = [];

        return this.tableDbNotes
            .iterate((value, key, index) => {
                listFromDB.push(value);
            })
            .then(() => {
                return listFromDB;
            });
    }

    static async getArchivesFromDB() {
        const archives = [];
        return this.tableDbArchives
            .iterate((value, key, index) => {
                archives.push(value);
            })
            .then(() => {
                return archives;
            });
    }

    static async addNote(newNote) {
        this.tableDbNotes.setItem(String(newNote.id), newNote);
    }

    static async setTableNotePosition(newTable) {
        try {
            for (let i = newTable.length - 1; i >= 0; i--) {
                const note = newTable[i]
                note.positionDate = new Date().getTime()
                this.tableDbNotes.setItem(note.id, note)
            }

        } catch (err) { console.log(err) }

    }

    static async setNote(note) {
        let id = note.id
        this.tableDbNotes.getItem(id).then((_) => {
            this.tableDbNotes.setItem(id, note)
        }
        )
    }

    static async setColorNoteInDB(id, color) {
        let note
        this.tableDbNotes.getItem(id).then((noteFound) => {
            note = noteFound
            note.color = color
            this.tableDbNotes.setItem(id, note)
        }
        )
    }


    static async setReminderNoteInDB(id, timeToRemind) {
        let note
        this.tableDbNotes.getItem(id).then((noteFound) => {
            note = noteFound
            note.reminder = timeToRemind
            this.tableDbNotes.setItem(id, note)
        }
        )
    }

    static async deleteNoteFromDB(id) {
        this.tableDbArchives.removeItem(String(id));
    }

    static async archiveNote(noteToArchive) {
        noteToArchive.positionDate = new Date().getTime()
        this.tableDbArchives.setItem(String(noteToArchive.id), noteToArchive);
        this.tableDbNotes.removeItem(String(noteToArchive.id));
    }

    static async unArchiveNote(noteToUnArchive) {
        noteToUnArchive.positionDate = new Date().getTime()
        this.tableDbNotes.setItem(String(noteToUnArchive.id), noteToUnArchive);
        this.tableDbArchives.removeItem(String(noteToUnArchive.id));
    }


}