import { Component } from '@angular/core';
import { Note } from './note';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent {

  notes = []
  currentNote: Note;
  currentNoteIndex = 0;
  collapsed = false;
  searchTerm = "";
  constructor(public datePipe: DatePipe) { }

  ngOnInit() {
    this.currentNote = new Note(new Date());
    this.notes.push(this.currentNote);
    if (localStorage.notes) {
      this.notes = JSON.parse(localStorage.notes);
      this.notes.forEach((note) => Object.setPrototypeOf(note, Note.prototype));
    }
    this.currentNote = this.notes[0];
  }
  //untitled note 1, untitled note 2, untitled note 3
  addNote() {
    this.currentNote = new Note(new Date());
    this.notes.push(this.currentNote);
    this.currentNoteIndex = this.notes.length - 1;
    //localStorage.notes=JSON.stringify(this.notes);
  }
  noteItemClick(note, index) {
    this.currentNote = this.notes[index];
    this.currentNoteIndex = index;
  }
  saveNote() {
    this.currentNote.edited = new Date();
    this.notes[this.currentNoteIndex] = this.currentNote;
    localStorage.notes = JSON.stringify(this.notes);
  }
  deleteNote() {
    if (this.notes.length != 1)
      this.notes.splice(this.currentNoteIndex, 1);
    if (!(this.currentNoteIndex - 1 < 0)) {
      this.currentNoteIndex -= 1;
      this.currentNote = this.notes[this.currentNoteIndex];
    }
    else{
      this.currentNoteIndex = 0;
      this.currentNote = this.notes[this.currentNoteIndex];
    }
  }
  toggle() {
    this.collapsed = !this.collapsed;
  }
}

