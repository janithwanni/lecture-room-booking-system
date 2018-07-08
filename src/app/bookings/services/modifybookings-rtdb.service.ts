import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of, concat } from 'rxjs';
import { UserInfoManagerService } from '../../shared/services/user-info-manager.service';
import { flatMap, map, take, mergeMap, takeLast, filter, concatAll } from 'rxjs/operators';
import {TableRow} from '../bookingsview/trackbookings/modifybookings-data-interface';

@Injectable({
  providedIn: 'root'
})
export class ModifybookingsRtdbService {

  constructor(private db:AngularFireDatabase,
              private userinfo:UserInfoManagerService) { }

  makeRows():Observable<TableRow[]>{
    var rows:TableRow[]=[];
    var obsrows:Observable<TableRow[]> = of(rows);
    var row:TableRow={confirmed:'',date:'',title:'',starttime:'',hall:''};
    var unconfirmedbase$ = this.userinfo.userauth.firebaseUser
    .pipe(
      flatMap(auth=>{return this.db.list('/root/user-bookings/'+auth.uid+'/unconfirmed').valueChanges()}),
      flatMap(values=>{return of(...values)}),
      flatMap(values=>{return this.db.list('/root/main-bookings/'+values).snapshotChanges()}),
      flatMap(snap=>{return snap.map(s=>{return s;})}),
      map(s=>{
        if(s.key == 'title'){row.title = s.payload.val()+""}
        if(s.key == 'date'){row.date = s.payload.val()+""}
        if(s.key == 'confirmed'){row.confirmed = s.payload.val()+""}
        
        return s;}),
      );
      
      var unconfirmedhallfilter = unconfirmedbase$.pipe(
        filter(s=>s.key=='hall-id'),
        flatMap(s=>{return this.db.object('/root/lecture-halls/'+s.payload.val()+'/name').valueChanges()}),
        map(hall=>{
          row.hall = hall+"";
          console.log(hall);
        })
      );
      unconfirmedhallfilter.subscribe(data=>{console.log(row)},error=>{});
      var unconfirmedtimefilter = unconfirmedbase$.pipe(
        filter(s=>(s.key=='timeslots')),
        flatMap(s=>{return this.db.object('/root/timeslots/'+Object.values(s.payload.val())[0]+'/start-time').valueChanges()}),
        map(time=>{
          row.starttime = time+"";
          console.log(time);
        })
      );
      unconfirmedtimefilter.subscribe(data=>{rows.push(row);obsrows = of(rows); console.log(rows)});
      return obsrows;
      /* var unconfirmedsource = of(unconfirmedbase$,unconfirmedhallfilter,unconfirmedtimefilter);
      var unconfirmed = unconfirmedsource.pipe(concatAll());
      unconfirmed.subscribe(data=>{}); */

     /* var confirmedbase$ = this.userinfo.userauth.firebaseUser
     .pipe(
       flatMap(auth=>{return this.db.list('/root/user-bookings/'+auth.uid+'/confirmed').valueChanges()}),
       flatMap(values=>{return of(...values)}),
       flatMap(values=>{return this.db.list('/root/main-bookings/'+values).snapshotChanges()}),
       flatMap(snap=>{return snap.map(s=>{return s;})}),
      ); *///add the above one but for confirmed ones

      
     
     
     /* .subscribe(value=>{console.log(value)}); */
    /* return this.userinfo.userauth.firebaseUser
    .pipe(
      flatMap(auth=>{return this.db.list('/root/user-bookings/'+auth.uid+'/unconfirmed').valueChanges()}),
      flatMap(values=>{return of(values)}) );
     *//* return this.db.list('/root/user-bookings/'+this.userinfo.getUserID()+'/unconfirmed').valueChanges()
            .pipe(map(value=>console.log(value)), flatMap(value=>this.db.list('/root/main-bookings/'+value+'/').valueChanges() ) ); */
            /* for (let val of value) { return this.db.list('/root/main-bookings/'+val+'/').valueChanges();  */
           /*  var a:{key:string;data:{}} = {key:s.payload.key,data:{}}; */
        /*TODO make this a table row and export the array of rows from this */
        /* if(s.payload.key =='hall-id'){ */
          /* this.db.object('/root/lecture-halls/'+s.payload.val()+'/name').valueChanges().pipe(
            take(1),
            takeLast(1)   
          ).subscribe(data=>console.log(data));
          console.log(a.data) */
        /* }else if(s.payload.key == 'timeslots'){
          var timeid = Object.values(s.payload.val())[0];
          this.db.object('/root/timeslots/'+timeid+'/start-time').valueChanges().subscribe(data=>console.log(data));
        }else{
          a.data = s.payload.val();
        } */
        //ugly solution
        /* while(a.data == {}){
        }
        rows.push(a); */
  }
}
/* 
merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}


export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
} */