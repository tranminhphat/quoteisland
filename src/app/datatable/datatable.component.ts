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
  value = '';
  dataSource: any;

  constructor() {}

  ngOnInit() {
    this.tableService.getRawData().then((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }

  getRowHeader(displayedColumns: TableColumn[]) {
    return displayedColumns.map((column) => column.def);
  }

  showRoles(roles: { id: string; name: string }[]) {
    return roles.map((role) => role.name).join(', ');
  }
}
