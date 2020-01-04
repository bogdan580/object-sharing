import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  Layer, Point
} from 'leaflet';

@Component({
  selector: 'jhi-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styles: [`
      .map {
          height: 100%;
          padding: 0;
      }
  `]
})
export class LeafletMapComponent implements OnInit {
  defPoint: Point = new Point(50.880145, 20.646798);

  @Input()
  zoom: number;

  _points: Point[];
  @Input()
  set points(pnts: Point[]) {
    console.log('new points', pnts);
    this._points = pnts;
      this.setNewMarkers();
  }
  get points(): Point[] {
    return this._points;
  }

  _startPoint: Point;
  @Input()
  set startPoint(pnt: Point) {
    console.log('new start', pnt);
    this._startPoint = pnt;
    this.setNewMarkers();
  }
  get startPoint(): Point {
    return this._startPoint;
  }

  _stopPoint: Point;
  @Input()
  set stopPoint(pnt: Point) {
    console.log('new stop', pnt);
    this._stopPoint = pnt;
    this.setNewMarkers();
  }
  get stopPoint(): Point {
    return this._stopPoint;
  }


  @Input()
  draggable = false;

  /*  Marker article
    https://asymmetrik.com/ngx-leaflet-tutorial-angular-cli/
    Define our base layers so we can reference them multiple times*/
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    tileSize: 512, // this set map font size
    zoomOffset: -1, // ...
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    tileSize: 1024, // this set map font size
    zoomOffset: -2, // ...
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {}
  };

  options: MapOptions;
  map: Map;

  ngOnInit(): void {
    const layers: Layer[] = [this.streetMaps];
    this.options = {
      layers,
      zoom: this.zoom,
      center: latLng([this.defPoint.x, this.defPoint.y])
    };

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
    */
  }

  setNewMarkers() {
    console.log('setNewMarkers()');
    if (this.map) {
      this.map.eachLayer(layer => {
        this.map.removeLayer(layer);
      });
      this.streetMaps.addTo(this.map);

      if (this.points.length === 0) this._stopPoint = null;

      this.points.forEach(p => {
        marker([p.x, p.y], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: '../../../content/images/marker-icon.png',
            shadowUrl: '../../../content/images/marker-shadow.png'
          }),
          draggable: this.draggable
        }).addTo(this.map);
      });

      if (this.stopPoint) {
        marker([  this.stopPoint.x, this.stopPoint.y ], {
          icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: '../../../content/images/marker-icon-stop.png',
            shadowUrl: '../../../content/images/marker-shadow.png',
          }),
          draggable: this.draggable,
        }).addTo(this.map);
      }


      // this.onMapReady(this.map);
    }

  }

  onMapReady(map: Map) {
    if (!this.map) {
      this.map = map;
    }
    if (this.points.length > 0) {
      this.defPoint = this.points[0];
    }
    const bounds = new LatLngBounds([[this.defPoint.x, this.defPoint.y]]);
    map.fitBounds(bounds, { maxZoom: this.zoom, animate: true });
  }

}
