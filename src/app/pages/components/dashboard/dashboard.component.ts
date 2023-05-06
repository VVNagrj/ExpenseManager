import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { APIService } from 'src/app/service/api.servies.mock';
import { SortColumn, SortDirection, SortEvent, TableSortableDirective } from 'src/app/service/sortable.directive';
import { TableLocalService } from 'src/app/service/table-local.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timeout: any = null;
  ticketTab: TableLocalService
  tasks1$: Observable<any[]>;
  totalTask$: Observable<number>;
  @ViewChildren(TableSortableDirective) headers: QueryList<TableSortableDirective>;

  onKeySearch(event: any) {
    if (event.key != 'Enter') {
      clearTimeout(this.timeout);
      this.timeout = setTimeout( () => {
        if (event.keyCode != 13) {
          this.ticketTab.searchTerm = event.target.value 
        }
      }, 1000);
    }
  }  

  constructor(
    private apiService: APIService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.apiService.getAllBorrowers().subscribe(e =>{

      this.ticketTab = new TableLocalService(e, this._matches, true);
      this.tasks1$ = this.ticketTab.result$.pipe(finalize(() => {}))
      this.totalTask$ = this.ticketTab.total$.pipe(finalize(() => {}))

      this.setSortDirection('dueDateTS', 'asc');
      this.ticketTab.sortColumn = 'firstName';
      this.ticketTab.sortDirection = 'asc';
      this.ticketTab.sortByDateReq = true;

    })
  }

  setSortDirection(column: SortColumn, direction: SortDirection) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      } else {
        header.direction = direction;
      }
    });
  }
  
  _matches = (result: any, term: string) => {
    return (
      result?.firstName?.toLowerCase()?.includes(term?.toLowerCase()) ||
      result?.lastname?.toLowerCase()?.includes(term?.toLowerCase()) ||
      result?.displayValue?.toLowerCase()?.includes(term?.toLowerCase()) ||
      result?.mobileNo?.toLowerCase()?.includes(term?.toLowerCase()) 
    );
  };


  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

      this.ticketTab.sortColumn = column;
      this.ticketTab.sortDirection = direction;
      this.ticketTab.sortByDateReq = false;
  }

  routeToPage(id:string){
    this.router.navigate([`/kalaimagal/borrower/${id}`]);
  }

}
