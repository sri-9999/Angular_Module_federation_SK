import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements from micro frontends
  // Note: CUSTOM_ELEMENTS_SCHEMA is used to allow custom elements (web components) in Angular.
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
