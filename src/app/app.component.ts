import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts: any;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      responsive: true,
      dom: 'Bfrtip',
      order: [],
      columnDefs: [{ targets: 0, orderable: false }],
      // buttons: [
      //   {
      //     className: '',
      //     extend: 'excel',
      //     sheetName: 'Company Code',
      //     title: 'Company Code List',
      //     exportOptions: {
      //       columns: [1, 2, 3],
      //       modifier: {
      //         page: 'current',
      //       },
      //     },
      //   },
      //   {
      //     extend: 'print',
      //     exportOptions: {
      //       columns: [1, 2, 3],
      //     },
      //   },
      // ],
    };

    this.http
      .get('http://jsonplaceholder.typicode.com/posts')
      .subscribe((posts) => {
        this.posts = posts;
        this.rerender();
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
