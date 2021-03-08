import {Component, ElementRef, AfterViewInit, ViewChild, Input, OnDestroy} from '@angular/core';
import * as OT                                                             from '@opentok/client';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})

export class SubscriberComponent implements AfterViewInit, OnDestroy {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;
  subscriber: OT.Subscriber;

  constructor() {
  }

  ngAfterViewInit() {
    this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {}, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  }

  ngOnDestroy() {
  }
}
