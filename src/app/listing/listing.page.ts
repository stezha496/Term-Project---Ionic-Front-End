import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatabaseServiceService } from '../database-service.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListingPage implements OnInit {

  outMsg: any = { msg: '' };
  fromDB: any = [];

  constructor(private dbService: DatabaseServiceService) {

  }

  ngOnInit() {
  }

  sendGetAll() {
    this.dbService.getAll().subscribe({
      next: (v: any) => {
        this.fromDB = v;
        // this.outMsg = v;
      },
      error: (e) => {
        console.error(e);
        this.outMsg.msg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }
}
