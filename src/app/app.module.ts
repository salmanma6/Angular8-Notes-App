
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FilterPipe } from './pipes/filter-pipe';
import { HighLightPipe } from './pipes/highlight-pipe';
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HighLightPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
