import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let router: jasmine.SpyObj<Router>;
  let storeMock: any;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    storeMock = {
      dispatch: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {provide: Store, useValue: storeMock},
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    component.loginForm = new FormBuilder().group({
      email: ['test1@test.com'],
      password: ['password123'] 
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create the loginForm with email and password controls', () => {
      component.ngOnInit();
  
      expect(component.loginForm).toBeDefined();
  
      expect(component.loginForm.contains('email')).toBeTruthy();
      expect(component.loginForm.contains('password')).toBeTruthy();
    });
  });

  describe('login', () => {
    it('should navigate to /users/login-success if the user exists', fakeAsync(() => {
      const mockUsers = getMockUsers();
      usersService.getUsers.and.returnValue(of(mockUsers));
      component.loginForm = new FormBuilder().group({
        email: ['test1@test.com'],
        password: ['password123'] 
      });

      component.login();
      tick();

      expect(router.navigate).toHaveBeenCalledOnceWith(['/users/login-success']);
    }));

    it('should not login if user does not exists', fakeAsync(() => {
      const mockUsers = getMockUsers();
      usersService.getUsers.and.returnValue(of(mockUsers));
      component.loginForm = new FormBuilder().group({
        email: ['test3@test.com'],
        password: ['password123'] 
      });

      component.login();
      tick();

      expect(router.navigate).not.toHaveBeenCalledOnceWith(['/users/login-success']);
    }));
  });
});

function getMockUsers() {
  return {
    data: [
      {
        id: 1,
        name: 'test1',
        email: 'test1@test.com'
      },
      {
        id: 2,
        name: 'test2',
        email: 'test2@test.com'
      }
    ]
  };
}
