import { Component, OnInit } from '@angular/core';
import { Note } from '../notedata';
import { NoteService } from '../note.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css']
})
export class MynotesComponent implements OnInit {

  notes : Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes(): void {
    this.noteService.getNotes()
        .subscribe(notes => this.notes = notes);
  }
  
  add(name: string, color: string, description: string): void {
    name = name.trim();
    color = color;
    description = description;
    console.log("this is add"+color);
    if (!name) { return; }
    this.noteService.addNote({ name,description,color } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note).subscribe();
  }
}