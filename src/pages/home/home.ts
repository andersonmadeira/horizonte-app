import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { AppConfig } from '../../config/app-config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coords: any;
  apiUrl = 'http://api.openweathermap.org/data/2.5/';

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private geolocation: Geolocation, public http: Http, public appConfig: AppConfig) {

  }

  ionViewDidLoad() {
    let locationDialog = this.loadingCtrl.create({
      content: 'Checking for your location...'
    });

    locationDialog.onDidDismiss(() => {
      // pass
    });

    locationDialog.present();

    let weatherDialog = this.loadingCtrl.create({
      content: 'Getting weather information for your location...'
    });

    weatherDialog.onDidDismiss(() => {
      // pass
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.coords = resp.coords;
      locationDialog.dismiss();

      weatherDialog.present();

      let url = this.apiUrl + 'weather?lat=' + this.coords.latitude + '&lon=' + this.coords.longitude + '&APPID=' + this.appConfig.apiKey;

      this.http.get(url).subscribe(data => {
        console.log(data);
        weatherDialog.dismiss();
      });

    }).catch((error) => {
      console.log('Error getting location: ', error);
      locationDialog.dismiss();
    });

    /*let watch = this.geolocation.watchPosition();

    watch.subscribe((data) => {
    // data.coords.latitude
    // data.coords.longitude
    });*/
  }

}
