import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  MapOptions,
  icon,
  latLng,
  Map,
  Marker,
  marker,
  tileLayer,
  LatLngBounds,
  LatLng,
  Layer, Point,
} from 'leaflet';

@Component({
  selector: 'jhi-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styles: [`
      .map {
          height: 100%;
          padding: 0;
      }
  `],
})
export class LeafletMapComponent implements OnInit {

  @Input('latitude')
  set latitude(lat: number) {
    this._latitude = lat;
    if (this.point) {
      this.point.setLatLng([  this.latitude, this.longitude ]);
      this.onMapReady(this.map);
    }
  }
  get latitude(): number {
    return this._latitude;
  }
  _latitude: number;
  @Input('longitude')
  set longitude(lon: number) {
    this._longitude = lon;
   if (this.point) {
     this.point.setLatLng([  this.latitude, this.longitude ]);
     this.onMapReady(this.map);
   }
  }
  get longitude(): number {
    return this._longitude;
  }
  _longitude: number;
  @Input()
  zoom: number;
  @Input()
  startPoint: Point;
  @Input()
  stopPoint: Point;

  @Input()
  draggable = false;
  @Output()
  newLatLng: EventEmitter<LatLng> = new EventEmitter<LatLng>();

  // Marker article
  // https://asymmetrik.com/ngx-leaflet-tutorial-angular-cli/
  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    tileSize: 512, // this set map font size
    zoomOffset: -1, // ...
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    tileSize: 1024, // this set map font size
    zoomOffset: -2, // ...
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
    },
    overlays: {},
  };

  point: Marker;
  // startMarker: Marker;
  // stopMarker: Marker;
  options: MapOptions;
  map: Map;

  ngOnInit(): void {
    const layers: Layer[] = [this.streetMaps];
    this.point = marker([  this.latitude, this.longitude ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: '../../../content/images/marker-icon.png',
        shadowUrl: '../../../content/images/marker-shadow.png',
      }),
      draggable: this.draggable,
    });

    layers.push(this.point);

  /*  if (this.startPoint) {
      this.startMarker = marker([  this.startPoint.x, this.startPoint.y ], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/images/marker-icon-start.png',
          shadowUrl: 'leaflet/marker-shadow.png',
        }),
        draggable: this.draggable,
      });
      layers.push(this.startMarker);
    }

    if (this.stopPoint) {
      this.stopMarker = marker([  this.stopPoint.x, this.stopPoint.y ], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/images/marker-icon-stop.png',
          shadowUrl: 'leaflet/marker-shadow.png',
        }),
        draggable: this.draggable,
      });
      layers.push(this.stopMarker);
    }*/

    this.options = {
      layers,
      zoom: this.zoom,
      center: latLng([ this.latitude, this.longitude ]),
    };
    this.point.on('dragend', () => {
      this.changePos(this.point.getLatLng());
    });
  }

  changePos(event: any) {
    console.log(event);
    this.latitude = event.lat;
    this.longitude = event.lng;
  }

  onMapReady(map: Map) {
    if (!this.map) {
      this.map = map;
    }
    const bounds = new LatLngBounds([[  this.latitude, this.longitude ]]);
    map.fitBounds(bounds, {  maxZoom: this.zoom, animate: true });
    this.newLatLng.emit(latLng([ this.latitude, this.longitude ]));
  }

}
