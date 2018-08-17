import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locationDialog: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private geolocation: Geolocation, private weather: WeatherProvider) {
    this.locationDialog = this.loadingCtrl.create({
      content: 'Checking for your location...'
    });
  }

  ionViewDidLoad() {

    this.locationDialog.present();

    this.geolocation.getCurrentPosition().then((resp) => {

      this.locationDialog.dismiss();
      this.weather.setLocation(resp.coords);

      this.weather.fetch().subscribe((data) => {
        console.log('Outer subscribe');
        console.log(data);
      })

    }).catch((error) => {
      console.log('Error getting location: ', error);
      this.locationDialog.dismiss();
    });

  }

}

/*let watch = this.geolocation.watchPosition();

watch.subscribe((data) => {
 // data.coords.latitude
 // data.coords.longitude
});*/

