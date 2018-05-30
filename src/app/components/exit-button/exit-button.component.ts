import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-exit-button',
  templateUrl: './exit-button.component.html',
  styleUrls: ['./exit-button.component.css']
})
export class ExitButtonComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
