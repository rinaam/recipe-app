import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './state/app.state';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { ResultComponent } from './pages/result/result.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ButtonComponent } from './components/button/button.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { SafePipe } from './pipes/safe.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from './components/container/container.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    HomeComponent,
    CardComponent,
    ResultComponent,
    CheckboxComponent,
    ButtonComponent,
    ShoppingListComponent,
    ModalComponent,
    SafePipe,
    ContainerComponent,
    FavoritesComponent,
    NotificationListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
