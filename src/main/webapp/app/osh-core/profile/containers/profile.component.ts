import { Component, OnInit } from '@angular/core';
import { LeafletMapService } from 'app/osh-ui/leaflet-map/leaflet-map.service';
import { OSMSearchResponse } from 'app/osh-ui/leaflet-map/leaflet-map.model';
import { Subscription } from 'rxjs';
import { Point } from 'leaflet';

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  addressSub: Subscription;
  startPoint: Point;
  zoom = 14;
  constructor(private mapService :LeafletMapService) {
    this.startPoint = null;
  }

  ngOnInit() {}

  findLocalization(address: string) {
    console.log('find localization: ', address);
    this.addressSub = this.mapService.searchByAddress(address).subscribe( (res: OSMSearchResponse[]) => {
      console.log('res', res);
      if (res.length > 0) {
        this.startPoint = new Point(+res[0].lat, +res[0].lon);
      } else {
        window.alert('Address not found. Please write correct address.');
      }
      this.addressSub.unsubscribe();
    });
  }

  print(str: string, event: any) {
    console.log(str, event.target.value);
    this.findLocalization(event.target.value);
  }
}
