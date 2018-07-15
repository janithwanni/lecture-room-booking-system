import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { TableRow } from "./modifybookings-data-interface";
import { Observable, BehaviorSubject } from "rxjs";
import { ModifybookingsRtdbService } from "../../services/modifybookings-rtdb.service";

export class ModifybookingsCdkDatasource implements DataSource<TableRow>{
    private lessonsSubject = new BehaviorSubject<TableRow[]>([]);

    constructor(private modbook: ModifybookingsRtdbService) {}
    connect(collectionViewer: CollectionViewer): Observable<TableRow[]> {
        return this.lessonsSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }

    loadRow(){
        this.modbook.makeRows().subscribe(row=>{console.log(row);this.lessonsSubject.next(row)});
    }
}
