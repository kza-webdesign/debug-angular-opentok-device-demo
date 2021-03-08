import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
// tslint:disable-next-line:import-spacing
import * as OT                                           from '@opentok/client';
// tslint:disable-next-line:import-spacing
import {OpentokService}                                  from '../opentok.service';
import {Router}                                          from '@angular/router';

@Component({
  selector: 'app-call-page',
  templateUrl: './call-page.component.html',
  styleUrls: ['./call-page.component.css']
})
export class CallPageComponent implements OnInit, OnDestroy {
  title = 'Angular Basic Video Chat';
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;

  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private router: Router) {
    this.changeDetectorRef = ref;
  }

  ngOnInit() {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
    })
      .then(() => this.opentokService.connect())
      .catch((err) => {
        console.error(err);
        alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
      });
  }

  ngOnDestroy() {
    this.streams.forEach((stream: OT.Stream) => {
    });
    this.session.disconnect();
  }

  goToWhatever() {
    this.router.navigate(['./whatever']);
  }
}
