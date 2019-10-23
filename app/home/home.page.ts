import { Component } from '@angular/core';
import {AfterViewInit,ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase';
import { FIREBASE_CONFIG }  from '../../environments/envi';
import { snapshotToArray }  from '../../environments/envi';

import {NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';

import {Platform} from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit {



 findme=[];
  
 ref=firebase.database().ref("findme/");



  latitude: any;
  longitude: any;
  //altitude:any;
  accuracy:any;
  time:any;
  public timer=59;
  public datacount=0;
  result:any;
  



  @ViewChild('mapElement') mapNativeElement: ElementRef;
  
  

  constructor(private geolocation: Geolocation,public geocoder:NativeGeocoder,public platform:Platform)
  {

   this.ref.on('value', resp=> {
      this.findme=snapshotToArray(resp);
    });
    
       this.startTimer();

   }

   startTimer(){

         var intervalVar=setInterval(function(){
			 
			 if(this.latitude!==undefined)
			 {
                this.timer--;
				
			 }
		 
		 
		 this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      //this.altitude = resp.coords.altitude;
      this.accuracy = resp.coords.accuracy;
	    this.time=Date();
    
	
	//for google map but not working because of API KeY
	/*********************************************************************************************/
	  
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
      });
      const infoWindow = new google.maps.InfoWindow;
      const pos = {
        lat: this.latitude,
        lng: this.longitude,
         
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
     /**************************************************************************************************/
           
         if(this.timer==0)
         {
            this.timer=59;
           
            if(this.latitude!==undefined && this.longitude!==undefined)
            {
			   this.datacount++;
               this.result="Latitude: "+this.latitude+" Longitude: "+this.longitude+" Time:  "+Date();
               let newItem=this.ref.push();
               newItem.set(this.result);
             }

         }

       
         }.bind(this),1000)



}
   

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    
    

  

  }

}

