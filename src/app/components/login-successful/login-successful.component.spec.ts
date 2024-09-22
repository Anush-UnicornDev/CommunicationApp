import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { pipe, Subject } from 'rxjs';
import { LoginSuccessfulComponent } from './login-successful.component';

describe('LoginSuccessfulComponent', () => {
  let component: LoginSuccessfulComponent;
  let fixture: ComponentFixture<LoginSuccessfulComponent>;
  let storeMock: any;
  let routerMock: any;
  let userSubject: Subject<any>;

  beforeEach(() => {
    userSubject = new Subject<any>;
    storeMock = {
      pipe: jasmine.createSpy().and.returnValue(userSubject.asObservable())
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [LoginSuccessfulComponent],
      providers: [
        {provide: Store, useValue: storeMock},
        {provide: Router, useValue: routerMock}
      ]
    });

    fixture = TestBed.createComponent(LoginSuccessfulComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the userName correctly if user data is available', () => {
      userSubject.next({ name: 'Test User' });
  
      expect(component.userName).toEqual('Test User');
    });
  
    it('should navigate to home page if user data is not available', () => {
      userSubject.next(null);
  
      expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    });

  });
});
