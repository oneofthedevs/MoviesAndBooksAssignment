import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public unsub = new SubSink();

  constructor(public activatedRoute: ActivatedRoute, public service: HttpServiceService) { }

  id: number;
  details: any;
  ngOnInit(): void {
    this.getId();
    this.getDetails(this.id);
  }
  getId() {
    // tslint:disable-next-line: radix
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getDetails(id: number) {
    this.service.getDeatils(id)
      .subscribe(data => {
        this.details = data;
        console.log(this.details);
      });
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
