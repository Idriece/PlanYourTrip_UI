import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule } from '@angular/material';
import { UserSignupLoginModule } from 'src/app/Modules/user-signup-login/user-signup-login.module';
import { UserService } from 'src/app/Services/user-service/user.service';
import { MatInputModule, MatIconModule, MatFormFieldModule, MatGridListModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { UpdateChangeRole } from 'src/app/Models/update-change-role';
import { Updateuserprofile } from 'src/app/Models/updateuserprofile';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('503651306992-e6fr1dscb7sq5m6s7de4kbmnr6r1mgch.apps.googleusercontent.com')
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    UserSignupLoginModule,
    MatNativeDateModule,
    SocialLoginModule
  ],
  providers: [UserService , UpdateChangeRole, Updateuserprofile, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
