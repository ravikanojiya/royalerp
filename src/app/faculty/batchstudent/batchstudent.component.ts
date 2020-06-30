import { Component, OnInit } from '@angular/core';
import { FacultyDataService } from '../faculty-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsDataService } from 'src/app/students/students-data.service';

@Component({
  selector: 'app-batchstudent',
  templateUrl: './batchstudent.component.html',
  styleUrls: ['./batchstudent.component.css']
})
export class BatchstudentComponent implements OnInit {
  batchid = 0;
  getstudent: Array<any> = [];
  uid = 0;
  countall: Array<any> = [];
  mbform: FormGroup;
  addstudent: Array<any> = [];
  constructor(private facservice: FacultyDataService, private studservice: StudentsDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.batchid = this.route.snapshot.params.id;
    console.log(this.batchid)
    this.facservice.getbatchstudent(this.batchid).then(res => {
      this.getstudent = res;
    });
    this.studservice.getmbatch().then(res => {
      if(res[0].studenttype=='club'){
        this.addstudent = res;
        console.log(res)
      }else if(res[0].studenttype=='gen'){
        this.addstudent = res;
      }else if(res[0].studenttype=='oto'){
        this.addstudent = res;
      }
    })
    this.mbform = new FormGroup({
      batchid: new FormControl(this.batchid, Validators.required),
      sid: new FormControl(this.addstudent[0].sid, Validators.required),
      status: new FormControl('Active', Validators.required),
      add_date: new FormControl(new Date(), Validators.required)
    });

  }
  submitstd() {
    this.studservice.mbatchadd(this.mbform.value).subscribe(res => {
      console.log('Yahoooooooooooooo');
    })
  }

}
