import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { NbThemeModule, NbToastrConfig, NbToastrModule } from '@nebular/theme';
import { AuthGuard } from './core/components/guards/auth.guard';
import { AuthInterceptor } from './core/Interceptors/authconfig.interceptor';
import { AuthService } from './core/Interceptors/auth.service';
import { L10nDisplayNamesPipe, L10nIntlModule, L10nTranslationModule } from 'angular-l10n';
import { TranslationLoader, l10nConfig } from './l10n-config';
import { HttpRequestInterceptor } from './core/Interceptors/http-request.interceptor';
import { LocalService } from './core/Services/localStorage.service';
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
    NbToastrModule.forRoot(),
    NbSecurityModule.forRoot(),
    
    NbAuthModule.forRoot({
      strategies: [ 
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000',
          token: {
            class: NbAuthOAuth2JWTToken,
            key: 'token'
          },
          refreshToken: {
            endpoint:'/auth/refresh-token',
            method: 'get',
            requireValidToken: true,
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
    L10nTranslationModule.forRoot(
      l10nConfig,
      {
        translationLoader: TranslationLoader
      }
    ),
    L10nIntlModule,
    L10nDisplayNamesPipe
  ],
  providers: [
    AuthService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    }, 
    AuthGuard,
    LayoutService,
    LocalService,
    {
      provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
