import { Component } from '@angular/core';
import { NavController, LoadingController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  icon_name: string = 'cloud';

  locationDialog: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private geolocation: Geolocation, private weather: WeatherProvider, private nativeStorage: NativeStorage, public platform: Platform) {
    this.locationDialog = this.loadingCtrl.create({
      content: 'Checking for your location...'
    });
  }

  ionViewDidLoad() {

    this.locationDialog.present();

    let getWeather = (resp) : any => {

      this.locationDialog.dismiss();
      this.weather.setLocation(resp.coords);

      this.weather.fetch().subscribe((data: any) => {
        console.log(data.weather[0].main);
        console.log(this.weather.getIconCode(data.weather[0].main));
        this.icon_name = this.weather.getIconCode(data.weather[0].main);
      }, (error) => { console.log('Error ocurred: ' + error) } );

    };

    if ( this.platform.is('cordova') ) {
      this.nativeStorage.getItem('location').then(
        data => getWeather(data),
        error =>  { console.log('Error getting location from storage: '); console.log(error); }
      );
    } else {
      this.geolocation.getCurrentPosition().then(getWeather).catch((error) => {
        console.log('Error getting location: ', error);
        this.locationDialog.dismiss();
      });
    }

  }

}

/*let watch = this.geolocation.watchPosition();

watch.subscribe((data) => {
 // data.coords.latitude
 // data.coords.longitude
});*/

