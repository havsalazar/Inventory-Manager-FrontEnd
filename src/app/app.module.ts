import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LayoutService } from './core/components/services/layout.service';
import {
  NbAuthModule,
  NbPasswordAuthStrategy, NbAuthJWTToken,NbAuthOAuth2JWTToken
} from '@nebular/auth';
import {
  NbSecurityModule,
  NbRoleProvider,
} from '@nebular/security';
import { of as observableOf } from 'rxjs';
import { NbThemeModule } from '@nebular/theme';
import { AuthGuard } from './core/components/guards/auth.guard';
export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbSecurityModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        // NbDummyAuthStrategy.setup({
        //   name : 'dummy',
        //   token : {
        //     class: NbAuthSimpleToken,
        //   },
        //   delay: 1000,
        //   alwaysFail: false,
        // }),

        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000',
          token: {
            class: NbAuthOAuth2JWTToken,
            key: 'token'
          }, 
          login: {
            endpoint: '/auth/signin',
            redirect: {
              success: 'main',
              failure: null
            }
          },
          register: {
            endpoint: '/auth/signup',
            redirect: {
              success: 'main',
              failure: null
            }
          },
          logout: {
            endpoint: '',

            // method:'GET'
          },
          requestPass: {
            endpoint: '/auth/request-pass',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
          },
          validation: {
            email: {
              required: false
            },
            password: {
              minLength: 3,
              required: true,
              maxLength: 50
            }

          }
        }),
      ],
      forms: {},
    }),
  ],
  providers: [
    AuthGuard,
    LayoutService,
    {
      provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
