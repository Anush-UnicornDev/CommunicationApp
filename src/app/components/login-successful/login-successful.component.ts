import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InitialState } from '../store/reducer';

@Component({
  selector: 'app-login-successful',
  templateUrl: './login-successful.component.html',
  styleUrls: ['./login-successful.component.scss']
})
export class LoginSuccessfulComponent implements OnInit {
  user$!: Observable<any>;
  userName: string = '';
  constructor(
    private store: Store<{currentUser: InitialState}>,
    private router: Router
  ) {
    this.user$ = this.store.pipe(select(state => state.currentUser?.user))
  }
  ngOnInit(): void {
    this.user$.subscribe(user => {
      if(user) {
        this.userName = user?.name
      } else {
        this.router.navigate(['']);
      }
    });
  }

  manageUsers() {
    
  }
}
