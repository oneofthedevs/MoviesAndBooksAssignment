import { DataTransferService } from './../shared/services/data-transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(private data: DataTransferService) { }

  ngOnInit(): void {
    this.data.remove();
  }

}
