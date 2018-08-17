import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingController, Loading } from 'ionic-angular';
import { AppConfig } from '../../config/app-config';


@Injectable()
export class WeatherProvider {
  private weatherInfo: Observable<any>;
  private apiUrl = 'http://api.openweathermap.org/data/2.5/';
  private weatherDialog: Loading;
  private finalUrl: string;
  private coords: Coordinates;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public appConfig: AppConfig) {
    this.weatherDialog = this.loadingCtrl.create({
      content: 'Getting weather information for your location...'
    });
  }

  setLocation(coords: Coordinates) {
    this.coords = coords;
    this.finalUrl = this.apiUrl + 'weather?lat=' + this.coords.latitude + '&lon=' + this.coords.longitude + '&APPID=' + this.appConfig.apiKey;
  }

  fetch() : Observable<Object> {
    this.weatherDialog.present();

    let observable = this.http.get(this.finalUrl);

    observable.subscribe(data => {
      console.log('Inner subscribe');
      console.log(data);
      this.weatherDialog.dismiss();
    });

    return observable;
  }

}