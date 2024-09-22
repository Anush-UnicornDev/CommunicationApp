import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { LoginFailComponent } from './components/login-fail/login-fail.component';
import { LoginSuccessfulComponent } from './components/login-successful/login-successful.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterSuccessfulComponent } from './components/register-successful/register-successful.component';
import { RegisterComponent } from './components/register/register.component';
import { dataReducer } from './components/store/reducer';
import { UsersListComponent } from './components/users-list/users-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent,
    WelcomeComponent,
    LoginSuccessfulComponent,
    RegisterComponent,
    RegisterSuccessfulComponent,
    ChatListComponent,
    EditUsersComponent,
    DocumentListComponent,
    LogoutComponent,
    LoginFailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({currentUser: dataReducer}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
