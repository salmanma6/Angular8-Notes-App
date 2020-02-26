import { Component } from '@angular/core';
import { Note } from './note';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  notes=[]
  currentNote: Note;
  currentNoteIndex;
  ngOnInit() {
    this.currentNote = new Note(new Date());
    this.notes.push(this.currentNote);
    if (!localStorage.notes == null)
      this.notes = JSON.parse(localStorage.notes);
    this.currentNote = this.notes[0];
  }
  addNote(){
    this.currentNote = new Note(new Date());
    localStorage.notes=JSON.stringify(this.notes);
  }
  noteItemClick(note,index){
    this.currentNote=this.notes[index];
    this.currentNoteIndex=index;
  }
  saveNote(){
    
    localStorage.notes=JSON.stringify(this.notes);
  }
  deleteNote(){
    
  }
}

