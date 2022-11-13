import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  path: string = '../assets/warning.png';
  errormanpath: string = '../assets/gear.png';
  animatedpath: string = '../assets/gear.png';
  constructor() {}

  ngOnInit(): void {}
}
