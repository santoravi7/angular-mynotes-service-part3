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
  
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.noteService.addHero({ name } as Note)
      .subscribe(hero => {
        this.notes.push(hero);
      });
  }

  delete(hero: Note): void {
    this.notes = this.notes.filter(h => h !== hero);
    this.noteService.deleteHero(hero).subscribe();
  }
}