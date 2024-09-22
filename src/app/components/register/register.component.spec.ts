import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let router: jasmine.SpyObj<Router>;  

  beforeEach(async() => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers', 'registerUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        FormBuilder,
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    const mockUsers = getMockUsers();
    usersService.getUsers.and.returnValue(of(mockUsers));
    usersService.registerUser.and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onRegister', () => {
    it('it calls register user api when user does not exists', fakeAsync(() => {
      component.registerForm = new FormBuilder().group({
        name: ['test name'],
        email: ['doesnotexistsuser@test.com'],
        phone: ['1234'],
        password: ['password123'],
        confirmPassword: ['password123'],
      });

      component.onRegister();
      tick();
      
      expect(router.navigate).toHaveBeenCalledOnceWith(['/users/registration-success']);
    }));

    it('it does not call register user api when user exists', fakeAsync(() => {
      component.registerForm = new FormBuilder().group({
        name: ['test name'],
        email: ['test1@test.com'],
        phone: ['1234'],
        password: ['password123'],
        confirmPassword: ['password123'],
      });

      component.onRegister();
      tick();
      
      expect(router.navigate).not.toHaveBeenCalled();
    }));
  });

  describe('checkPassword', () => {
    it('it returns passwordDoesNotMatch when passwords do not match', () => {
      component.registerForm.get('password')?.setValue('abc');
      component.registerForm.get('confirmPassword')?.setValue('xyz');
  
      const errors = component.registerForm.get('confirmPassword')?.errors;

      expect(errors).toEqual({ 'passwordDoesNotMatch': 'Password does not match' });
    });

    it('it returns null when passwords match', () => {
      component.registerForm.get('password')?.setValue('password123');
      component.registerForm.get('confirmPassword')?.setValue('password123');
  
      const errors = component.registerForm.get('confirmPassword')?.errors;

      expect(errors).toBeNull();  
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

});
