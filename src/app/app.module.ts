import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Interceptor } from './shared/interceptor/interceptor';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './views/login/login.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';

const authenticatorService = [Interceptor];

@NgModule({
  declarations: [AppComponent],
  providers: [
    authenticatorService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    SharedModule,
  ],
})
export class AppModule {}
