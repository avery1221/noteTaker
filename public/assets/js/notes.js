const util = require("util");
const fs = require("fs");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Notes {
    constructor() {
        this.idDum = 0;
    }
    read() {
        return readFile("./db/db.json", "utf8");
    }
    write(note) {
        return writeFile("./db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(notes => {
            let array;
            try {
                array = [].concat(JSON.parse(notes));
            }
            catch (err) {
                array = [];
            }
            return array;
        })
    }
    addNotes(note) {
        const { title, text } = note;
        const newNet = { title, text, id: ++this.idDum }
        return this.getNotes()
            .then(notes => [...notes, newNet])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNet)
    }
    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(updatedNotes => this.write(updatedNotes))
    }
}
module.exports = new Notes();