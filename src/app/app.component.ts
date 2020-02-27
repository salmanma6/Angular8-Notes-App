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
  currentNoteIndex=0;
  collapsed = false;
  constructor(public datePipe:DatePipe){}

  ngOnInit() {
    this.currentNote = new Note(new Date());
    this.notes.push(this.currentNote);
    if (!localStorage.notes == null)
      this.notes = JSON.parse(localStorage.notes);
    this.currentNote = this.notes[0];
  }
  //untitled note 1, untitled note 2, untitled note 3
  addNote() {
    this.currentNote = new Note(new Date());
    this.notes.push(this.currentNote);
    this.currentNoteIndex=this.notes.length-1;
    //localStorage.notes=JSON.stringify(this.notes);
  }
  noteItemClick(note, index) { 
    this.currentNote = this.notes[index];
    this.currentNoteIndex = index;
  }
  saveNote() {
    //  localStorage.notes = JSON.stringify(this.notes);
  }
  deleteNote() {
    this.notes.splice(this.currentNoteIndex, 1);
    if(! (this.currentNoteIndex - 1 < 1)) {
      this.currentNoteIndex -= 1;
      this.currentNote=this.notes[this.currentNoteIndex];
    }
  }
  searchChange() {

  }
  toggle() {
    this.collapsed = !this.collapsed;
  }
}

