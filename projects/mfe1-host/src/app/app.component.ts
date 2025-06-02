import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'mfe1-host';

  ngOnInit() {
    const scriptId = 'mfe3-bookmark-remote-entry';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'http://localhost:4300/remoteEntry.js';
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }
}