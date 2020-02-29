import { FilterPipe } from './pipes/filter-pipe';
import { Component } from '@angular/core';
import { Note } from './note';
import { DatePipe } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe, FilterPipe],
  
})
export class AppComponent {
   //414px for mobile
  noteNameChange: Subject<string> = new Subject<string>();
  noteNameChangeSubscription: Subscription;
  noteContentChange: Subject<string> = new Subject<string>();
  noteContentChangeSubscription: Subscription;
  notes = []
  currentNote: Note;
  currentNoteIndex = 0;
  collapsed = false;
  searchTerm = "";
  ids = [];
  collapseIcon="left"
  constructor(public datePipe: DatePipe, public filterPipe: FilterPipe) { }
  ngOnInit() {
    let id = this.generateId();
    this.currentNote = new Note(new Date(), id);
    this.notes.push(this.currentNote);
    if (localStorage.notes) {
      this.notes = JSON.parse(localStorage.notes);
      this.notes.forEach((note) => Object.setPrototypeOf(note, Note.prototype));
    }
    if (localStorage.ids) {
      this.ids = JSON.parse(localStorage.ids);
    }
    this.currentNote = this.notes[0];
    this.noteNameChangeSubscription = this.noteNameChange
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(name => {
        this.saveNote();
      });
    this.noteContentChangeSubscription = this.noteContentChange
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(content => {
        this.saveNote();
      });
  }

  addNote() {
    let id = this.generateId();
    this.currentNote = new Note(new Date(), id);
    this.notes.push(this.currentNote);
    this.currentNoteIndex = this.notes.length - 1;
    //localStorage.notes=JSON.stringify(this.notes);
  }

  noteItemClick(note) {
    let index = this.notes.findIndex((noteInArray) => (note.id == noteInArray.id))
    this.currentNote = this.notes[index];
    this.currentNoteIndex = index;
  }

  saveNote() {
    this.currentNote.edited = new Date();
    this.notes[this.currentNoteIndex] = this.currentNote;
    localStorage.notes = JSON.stringify(this.notes);
    localStorage.ids = JSON.stringify(this.ids);
  }

  deleteNote() {
    if (this.notes.length != 1) {
      this.notes.splice(this.currentNoteIndex, 1);
      this.ids.splice(this.currentNoteIndex, 1);
      localStorage.notes = JSON.stringify(this.notes);
      localStorage.ids = JSON.stringify(this.ids);
    }
    if (!(this.currentNoteIndex - 1 < 0)) {
      this.currentNoteIndex -= 1;
    }
    else {
      this.currentNoteIndex = 0;
    }
    this.currentNote = this.notes[this.currentNoteIndex];
  }


  generateId() {
    let id = Math.floor(Math.random() * 100) + 1;
    if (this.ids.indexOf(id) == -1) {
      this.ids.push(id);
    }
    else {
      id = this.generateId();
    }
    return id;
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.collapseIcon=this.collapsed?"right":"left";
  }

  ngOnDestroy() {
    this.noteNameChangeSubscription.unsubscribe();
    this.noteContentChangeSubscription.unsubscribe();
  }

}

