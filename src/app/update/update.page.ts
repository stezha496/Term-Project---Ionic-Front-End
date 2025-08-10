import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // So we dont need to import each individual Ion thing from the forms
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatabaseServiceService } from '../database-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class UpdatePage implements OnInit {
  // Can be string or null
  retrievedQ!: string | null;
  retrievedA!: string | null;
  outMsg: any = { msg: '' };
  // newQ: string = '';
  // newA: string = '';
  updateForm!: FormGroup;

  constructor(private activeroute: ActivatedRoute, private dbService: DatabaseServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.retrievedQ == null) {
      this.retrievedQ = "";
    }
    if (this.retrievedA == null) {
      this.retrievedA = "";
    }
    let retrievedDoc = this.activeroute.snapshot.queryParamMap;
    this.retrievedQ = retrievedDoc.get("Question");
    this.retrievedA = retrievedDoc.get("Answer");

    // For the update form
    this.updateForm = this.formBuilder.group({
      newQ: ['', Validators.required],
      newA: ['', Validators.required]
    })
  }

  sendDeleteItem() {
    const data = {
      "Question": this.retrievedQ,
      "Answer": this.retrievedA
    };
    this.dbService.deleteItem(data).subscribe({
      next: (v: any) => {
        console.log(v);
        this.outMsg = v;
      },
      error: (e) => {
        console.error(e);
        this.outMsg.msg = e.message;
      },
      complete: () => console.info('Complete')
    });
    alert('Data deleted');
  }


  sendUpdateItem() {

  }

  sendAddItem() {
    const data = {
      "Question": this.updateForm.value["newQ"],
      "Answer": this.updateForm.value["newA"]
    };
    this.dbService.addItem(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outMsg = data.message;
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }
}
