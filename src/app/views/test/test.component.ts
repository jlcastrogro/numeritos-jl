import {Component, OnInit} from '@angular/core';
import {AuthService, User} from '../../services';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testCompleted: any[] = [];
  testToGo: any[] = [];
  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = {
      _id: '',
      _rev: '',
      alias: '',
      gender: 'boy'
    };

    this.auth.user.subscribe(user => this.user = user);

    // TODO...
    this.testCompleted = [1, 2, 3, 4];
    this.testToGo = [5, 6, {test: 1}];
  }
}
