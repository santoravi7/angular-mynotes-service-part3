import { Injectable } from '@angular/core';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Notedata } from './notedata';
import { Notes } from './notes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn : 'root',
})
export class NoteService {

  private notesUrl = "api/notes";

  constructor(
    private http : HttpClient,
    private messageService: MessageService) { }

  // getNotes(): Observable<Notedata[]> {
  //   this.messageService.add('NoteService: fetched notes');
  //   console.log("this is service : "+Notes);
  //   return of(Notes);
  // }

  getNotes (): Observable<Notedata[]> {
    return this.http.get<Notedata[]>(this.notesUrl)
      .pipe(
        tap(_ => this.log('fetched notes')),
        catchError(this.handleError<Notedata[]>('getNotes', []))
      );
  }

  getNote(id: number): Observable<Notedata> {
    // TODO: send the message _after_ fetching the hero
    console.log("This is noteService.getNote : "+id);
    this.messageService.add(`NoteService: fetched note id=${id}`);
    return of(Notes.find(note => note.id === id));
  }

  private log(message: string) {
    this.messageService.add(`NoteService: ${message}`);
  }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

}