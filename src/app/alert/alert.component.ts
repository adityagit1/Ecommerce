import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  get inProcess(): boolean {
    return this._inProcess;
  }

  @Input() notification: any;

  @Output() notificationChange: EventEmitter<string> = new EventEmitter<string>();

  private _inProcess = false;


  ngAfterViewChecked() {
    if (this.notification && !this._inProcess) {
      this._inProcess = true;
      setTimeout(() => {
        this.notification = '';
        this.notificationChange.emit(this.notification);
        this._inProcess = false;
      }, 3000);
    }
  }


}
