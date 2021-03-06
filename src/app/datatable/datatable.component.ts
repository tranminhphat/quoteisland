import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '../core/models/tablecolumn';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit {
  @Input() displayedColumns: TableColumn[];
  @Input() tableService: TableService;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  pagination: any;

  constructor() {}

  ngOnInit() {
    this.getTableData();
  }

  refresh() {
    this.getTableData();
  }

  getTableData() {
    this.tableService.getRawData().then((res) => {
      this.pagination = res.pagination;
      this.dataSource = new MatTableDataSource(res.items);
      this.dataSource.sort = this.sort;
    });
  }

  getRowHeader(displayedColumns: TableColumn[]) {
    return displayedColumns.map((column) => column.def);
  }

  openEditModal(data) {
    const dialog = this.tableService
      .openEditModal(data)
      .afterClosed()
      .subscribe((message) => {
        if (message) {
          this.refresh();
        }
      });
  }

  openDeleteModal(id: string) {
    this.tableService
      .openDeleteModal(id)
      .afterClosed()
      .subscribe((message) => {
        if (message) {
          this.refresh();
        }
      });
  }

  showRoles(roles: { id: string; name: string }[]) {
    return roles.map((role) => role.name).join(', ');
  }

  onPageChange($event) {
    this.tableService.pagination.pageNumber = $event.pageIndex + 1;
    this.refresh();
  }
}
