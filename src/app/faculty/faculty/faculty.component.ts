import { Component, OnInit } from '@angular/core';
import { FacultyDataService } from '../faculty-data.service';
import { AdminDataService } from 'src/app/admin/admin-data.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
uid=0;
getname:Array<any>=[];
batchcount=0;
  constructor(private facservice:FacultyDataService ,private adminservice:AdminDataService) { }

  ngOnInit() {
    this.uid=parseInt(sessionStorage.getItem('uid'));
    this.adminservice.getuserbyid(this.uid).then(res=>{
      this.getname=res[0];
    });
    this.facservice.contfacbatch(this.uid).then(res=>{
      this.batchcount=res;
    })
  }

}
