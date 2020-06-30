import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HrDataService } from 'src/app/hr/hr-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyDataService } from '../faculty-data.service';
import { StudentsDataService } from 'src/app/students/students-data.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  batchform: FormGroup;
  getallemp: Array<any> = [];
  getallcourse: Array<any> = [];
  getbatchbyid: Array<any> = [];
  getallbacthes: Array<any> = [];
  getstudents:Array<any>=[];
   uid = 0;
  batchid = 0;
  batches:Array<any>=[];
  constructor(private facservice: FacultyDataService,private studservice:StudentsDataService,
     private service: HrDataService, private rut: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.uid = parseInt(sessionStorage.getItem('uid'));
    console.log(this.uid)
    this.service.getemp().then(res => {
      this.getallemp = res;
      console.log(res)
    });
  //  this.facservice.countstudent(this.uid).then(res=>{
  //    this.batches=res;
  //  });
    this.service.getcourses().then(res => {
      this.getallcourse = res;
    });
    this.facservice.getbatchebyid(this.uid).then(res => {
      this.getallbacthes = res;
    });
    this.facservice.getfacstudent(this.uid).then(res=>{
      this.getstudents=res;
    }); 
    this.batchid = this.rut.snapshot.params.id;
    if (this.batchid) {
      this.facservice.getbatchebyid(this.batchid).then(res => {
        this.getbatchbyid = res;
        this.batchform = new FormGroup({
          batchid:new FormControl(this.getbatchbyid[0].batchid),
          bcode: new FormControl(this.getbatchbyid[0].bcode, Validators.required),
          batchname: new FormControl(this.getbatchbyid[0].batchname, Validators.required),
          batchtype: new FormControl(this.getbatchbyid[0].batchtype, Validators.required),
          cid: new FormControl(this.getbatchbyid[0].cid, Validators.required),
          startdate: new FormControl(this.getbatchbyid[0].startdate, Validators.required),
          enddate: new FormControl(this.getbatchbyid[0].enddate, Validators.required),
          starttime: new FormControl(this.getbatchbyid[0].starttime, Validators.required),
          endtime: new FormControl(this.getbatchbyid[0].endtime, Validators.required),
          status: new FormControl(this.getbatchbyid[0].status, Validators.required)
        });
      });
    }
    this.batchform = new FormGroup({
      bcode: new FormControl('', Validators.required),
      batchname: new FormControl('', Validators.required),
      batchtype: new FormControl('', Validators.required),
      cid: new FormControl('', Validators.required),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      created_at: new FormControl(new Date()),
      uid: new FormControl(this.uid, Validators.required),
    });
  }

  submit() {
    if (this.batchid) {
      this.facservice.updatebatch(this.batchform.value).subscribe(res => {
        console.log('batchupdated.........');
      });
      this.route.navigate(['./sidebar/faculty/faculty/batches']);

    } else {
      this.facservice.addbatch(this.batchform.value).subscribe(res => {
        console.log('Batch addedd.......');
      });
      this.route.navigate(['./sidebar/faculty/faculty/batches']);

    }
  }
  deletebatch(value){
    this.facservice.deletebatch(value).subscribe(res=>{
      console.log('deleted....');
    });
    this.route.navigate(['./sidebar/faculty/faculty/batches']);

  }
}
