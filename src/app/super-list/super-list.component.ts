import * as jsPDF from 'jspdf';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firestore, User } from 'firebase';
import { combineLatest, Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { superList } from '../shared/models/superList.interface';
import { SuperlistService } from './service/superlist.service';
import { map, switchMap } from 'rxjs/operators';
import { uniq, flatten } from 'lodash';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
@Component({
  selector: 'app-super-list',
  templateUrl: './super-list.component.html',
  styleUrls: ['./super-list.component.css']
})
export class SuperListComponent implements OnInit {

  ingredients: Observable<any[]>; // Variable para recibir los ingredientes
  unit: Observable<any[]>; // Variable para recibir la unidad de medida
  itemList: Observable<superList[]>;

  superlistForm = new FormGroup({
    superlistIngredients: new FormControl(''),
    superlistQuantity: new FormControl(''),
    superlistUnit: new FormControl(''),
  });
  public latitude;
  public longitud;
  @ViewChild('idUser') inputUserid: ElementRef;
  @ViewChild('list') list: ElementRef;

  map: mapboxgl.Map;

  public user$: Observable<User> = this.authService.afAuth.user;
  lo1: number;
  lo2: number;
  la1: any;
  la2: any;
  constructor(public firestore: AngularFirestore, private storage: AngularFireStorage, private superlistService: SuperlistService, private authService: AuthService, private router: Router) {
    this.unit = firestore.collection('unit').valueChanges();
    this.ingredients = firestore.collection('ingredients', ref => ref.where("requests", ">=", 3)).valueChanges();
    this.itemList = this.firestore
      .collection<superList>("superList", ref => ref.where("uidUser", "==", this.router.url.slice(13)))
      .valueChanges()
  }



  ngOnInit(): void {
    this.getLocation();
    console.log(this.router.url.slice(13));
  }
  getLocation() {
    this.superlistService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitud = pos.lng;
    });
  }
  async insert_superlist() {
    try {
      const { superlistIngredients, superlistQuantity, superlistUnit } = this.superlistForm.value;
      if (superlistUnit == "" || superlistIngredients == "") {
        window.alert("Por favor que no esten vacios ");
      } else if (superlistQuantity == " ") {
        window.alert("Por favor que no esten vacios ");
      }
      else if (superlistQuantity == "  ") {
        window.alert("Por favor que no esten vacios ");
      }
      else if (superlistQuantity == "   ") {
        window.alert("Por favor que no esten vacios ");
      }
      else if (superlistQuantity == "    ") {
        window.alert("Por favor que no esten vacios ");
      }
      else {
        const id = Math.random().toString(36).substring(2);
        //let superlistUnitC = superlistUnit;
        const superlistInfo: superList = {
          uid: id,
          uidIngredient: superlistIngredients,
          cant: superlistQuantity,
          uidUnit: superlistUnit,
          uidUser: this.inputUserid.nativeElement.value
        };
        console.log(superlistInfo);
        this.superlistService.superListCollection(superlistInfo);
        this.superlistForm.reset("");
        //this.router.navigate(['/home']);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  dowlandPDF() {
    let doc = new jsPDF("portrait", "px", "a4");
    let specialElementsHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let content = this.list.nativeElement;

    doc.fromHTML(content.innerHTML, 10, 10, {
      'width': 80,
      'elementHandlers': specialElementsHandlers
    });
    doc.save("lista_de_super.pdf");
    
    this.mapLocation();
    
  }
  deleteItems(e) {
    this.superlistService.deleteItems(this.router.url.slice(13), e);
    window.alert("Ingrediente Eliminado");
  }
  mapLocation() {
     this.lo1 = this.longitud + 1;
    this.lo2 = this.longitud + 0.300;
    this.la1 = this.latitude + 1;
    this.la2 = this.latitude + 0.300;
    (mapboxgl as any).accessToken = environment.mapBoxKey;
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitude], // starting position
      zoom: 15 // starting zoom
    });
    const marker = new mapboxgl.Marker()
      .setLngLat([this.longitud, this.latitude])
      .addTo(this.map);
      const geocoder = new MapboxGeocoder({ // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true, // Do not use the default marker style
        //bbox: [this.lo1, this.la1, this.lo2, this.la2], 
      }).addTo(this.map);
      this.map.on('load', function() {
        this.map.addSource('single-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });
      
        this.map.addLayer({
          id: 'point',
          source: 'single-point',
          type: 'circle',
          paint: {
            'circle-radius': 10,
            'circle-color': '#448ee4'
          }
        });
      
        // Listen for the `result` event from the Geocoder
        // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on('result', function(e) {
          this.map.getSource('single-point').setData(e.result.geometry);
        });
      });
  }
}
