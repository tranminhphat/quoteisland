import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, tap } from 'rxjs/operators';
import { TableColumn } from 'src/app/core/models/tablecolumn';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { environment } from 'src/environments/environment';
import { UserManagementTableServiceService } from '../../services/user-management-table-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  readonly bannerImageUrls = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;

  displayedColumns: TableColumn[] = [
    { def: '_id', colName: 'ID' },
    { def: 'firstName', colName: 'First name' },
    { def: 'lastName', colName: 'Last name' },
    { def: 'roles', colName: 'Roles' },
    { def: 'username', colName: 'Username' },
    { def: 'options', colName: 'Options' },
  ];

  constructor(public tableService: UserManagementTableServiceService) {}

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => {
          this.searchUser(value);
        })
      )
      .subscribe();
  }

  openAddModal() {
    const dialog = this.tableService.openAddModal();
    dialog.afterClosed().subscribe((message) => {
      if (message) {
        this.datatable.refresh();
      }
    });
  }

  searchUser(value: string) {
    console.log(value);
    this.tableService.filterMode['username'] = value;
    this.datatable.refresh();
  }
}
