import { Component, OnInit } from '@angular/core';
import{HeatmapsService} from '../heatmaps.service';
import {tileLayer, latLng, marker, Marker,circle,polygon ,control, MapOptions, LatLng, layerGroup, LayerGroup, Map, LatLngBounds, ImageOverlay, CRS} from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
//  import * as L from 'leaflet';


declare let L;
declare var HeatmapOverlay;

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.css']
})
export class HeatmapsComponent implements OnInit  {
  

  // markers = [
  //   {
  //     "name": "Canada",
  //     "url": "https://en.wikipedia.org/wiki/Canada",
  //     "lat": 56.130366,
  //     "lng": -106.346771
  //   },
  //   {
  //     "name": "Anguilla",
  //     "url": "https://en.wikipedia.org/wiki/Anguilla",
  //     "lat": 18.220554,
  //     "lng": -63.068615
  //   },]

  
  markers=[];
   

  

  constructor(private hs:HeatmapsService) { }
  // onMapReady(map) {
  //   // get a local reference to the map as we need it later
  //   this.map = map;
  // }

  
 

  ngOnInit() {
    this.hs.getMapsData().subscribe((res)=>{
      
       this.markers=res;
       console.log(this.markers);
      // JSON.stringify(Object.assign({}, res));
      this.mapsin();

      
     
     
   
      
  
    });
    this.hs.getVisitData().subscribe((res)=>{
      console.log("visitsData");
      console.log(res);
    });


    //workin code
   
    
   
  }
  
  
  mapsin(){
    const w = 944;
    const h = 883;

   
  // var bounds = [[0,0], [1000,1000]];
    const themap = new Map('image-map', { 
      minZoom: -0.2,
      maxZoom: 4,
      // center: [0, 0],
       zoom: 1, 
       attributionControl : false, 
      inertia : false, 
      zoomControl : true,
      crs:CRS.Simple,
      
       } );
       var addressPoints:any[] = [];
      
      //  const southWest = themap.unproject([0, h ], themap.getMaxZoom() - 1 );
      // const northEast = themap.unproject([w, 0], themap.getMaxZoom() - 1 );
      const bounds = new LatLngBounds( [0,0], [944,883] );
      const overlayMap = new ImageOverlay( '../../assets/gdp.jpg', bounds );
      overlayMap.addTo( themap );

      
  
     

      
    
    
    for ( var i=0; i < this.markers.length; ++i ) 

{
      console.log(this.markers[i]);
      addressPoints.push([this.markers[i][2],this.markers[i][1]]);


  //  L.marker( [this.markers[i].lat, this.markers[i].lng] )
  //     .bindPopup( '<a href="' + this.markers[i].url + '" target="_blank">' + this.markers[i].name + '</a>' )
  //     .addTo( themap );






//   L.circle([this.markers[i][2], this.markers[i][1]] ,1, {
//     color: 'blue',
//      fillColor: '#ccc',
//     fillOpacity: 0.8,
//       opacity:0.8
               
    
    
    
// }).addTo(themap);




  


 
}
console.log("new array");
console.log(addressPoints);
  

L.heatLayer(addressPoints, {
  radius : 10, // default value
  blur : 15, // default value
  gradient : {
      0.0: 'green',
      0.5: 'yellow',
      1.0: 'red'
                  },
  minOpacity: 0.7 // Values can be set for a scale of 0-1


}).addTo(themap);
    
    //  themap.setMaxBounds( bounds );
    themap.fitBounds( bounds );


  }

  



}
 
  
  


