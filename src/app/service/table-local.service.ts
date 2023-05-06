import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import * as _ from 'lodash';

interface SearchResult {
  result: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  currentState: number;
  currentStatus: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  sortByDateReq: boolean;
}

const compare = (v1: string | number, v2: string | number) => {
  const a = !isNaN(+v1) ? +v1 : v1;
  const b = !isNaN(+v2) ? +v2 : v2;
  const sort = a < b ? -1 : a > b ? 1 : 0;
  return sort;
};

function getTimeVal(date?: Date) {
  return date != null ? new Date(date).getTime() : 0;
}

function sort(result: any[], column: SortColumn, direction: string, sortByDateReq?: boolean): any[] {
  if (direction === '' || column === '') {
    return result;
  } else if (sortByDateReq) {
    return [...result].sort((a, b) => {
      if (a[column] === null || a[column] === undefined || a[column] === '') {
        return 1;
      }
      if (b[column] === null || b[column] === undefined || b[column] === '') {
        return -1;
      }

      if (direction === 'asc') {
        return getTimeVal(a[column]) < getTimeVal(b[column]) ? -1 : 1;
      } else {
        return getTimeVal(a[column]) < getTimeVal(b[column]) ? 1 : -1;
      }
    });
  } else {
    return [...result].sort((a, b) => {
      if (a[column] === null || a[column] === undefined || a[column] === '') {
        return 1;
      }
      if (b[column] === null || b[column] === undefined || b[column] === '') {
        return -1;
      }
      const res = compare(_.get(a, column)?.toString()?.toLowerCase(), _.get(b, column)?.toString()?.toLowerCase());
      return direction === 'asc' ? res : -res;
    });
  }
}
export class TableLocalService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _result$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private matches$: any;
  private _state: State = {
    page: 1,
    pageSize: 10,
    currentState: 1,
    currentStatus: '',
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    sortByDateReq: false,
  };
  private showAllStates = false;
  private disablePagination = false;
  constructor(private data?: any, _matches?: any, showAllStates?: boolean, disablePagination?: boolean) {
    this.matches$ = _matches
    if (data) {
      this._search$
        .pipe(
          tap(() => {
            this._loading$.next(true);
            this._result$.next([]);
            this._total$.next(0);
          }),
          debounceTime(200),
          switchMap(() => this._search()),
          tap(() => this._loading$.next(false)),
          finalize(() => this._loading$.next(false))
        )
        .subscribe((result) => {
          this._result$.next(result.result);
          this._total$.next(result.total);
        });
      this._search$.next();
    } else {
      this._loading$.next(false);
      this._result$.next([]);
      this._total$.next(0);
    }
  }
  get result$() {
    return this._result$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }


  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortByDateReq(sortByDateReq: boolean) {
    this._set({ sortByDateReq });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }


  set loading(status: boolean) {
    this._loading$.next(status);
  }
  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  private _search(): Observable<SearchResult> {
    const {
      sortColumn,
      sortByDateReq,
      sortDirection,
      pageSize,
      page,
      searchTerm,
    } = this._state;

    let result = this.data 
    
    //sort(this.data, sortColumn, sortDirection, sortByDateReq)

    // 2. filter search
    result = result?.filter((result: any) =>
      this.matches$(result, searchTerm)
    );

    const total = result?.length;
    // // 8. paginate
    // if (!this.disablePagination) result = result?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ result, total });
  }
}
