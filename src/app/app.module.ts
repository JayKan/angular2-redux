import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';
import { CONTACT_DIRECTIVES, CONTACT_STORE_PROVIDERS } from './components/contact';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [CONTACT_STORE_PROVIDERS],
  declarations: [AppComponent, CONTACT_DIRECTIVES],
  bootstrap: [AppComponent]
})
export class AppModule {}
