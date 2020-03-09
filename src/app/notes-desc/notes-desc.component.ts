import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
// import { notes } from '../notes'
import { Note } from '../notedata';
import { NoteService } from '../note.service';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-notes-desc',
  templateUrl: './notes-desc.component.html',
  styleUrls: ['./notes-desc.component.css']
})

export class NotesDescComponent implements OnInit {
  note:Note;
  
  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    ) { }


  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("this is getNote noteID : "+id);
    this.noteService.getNote(id)
      .subscribe(note => this.note = note);
      console.log("note value -"+this.note);
  }
  
}

