import { Component, OnInit } from '@angular/core';
import { LeafletMapService } from 'app/osh-ui/leaflet-map/leaflet-map.service';
import { OSMSearchResponse } from 'app/osh-ui/leaflet-map/leaflet-map.model';
import { Subscription } from 'rxjs';
import { Point } from 'leaflet';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  addressSub: Subscription;
  startPoint: Point;
  zoom = 14;

  isSaving: boolean;
  isEdit: boolean;
  profileForm = this.fb.group({
    userInfoId: [],
    tel: [undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    locationId: [],
    streetAddress: [undefined, [Validators.required]],
    postalCode: [],
    city: [undefined, [Validators.required]],
    stateProvince: []
  });
  constructor(private fb: FormBuilder, private mapService :LeafletMapService) {
    this.startPoint = null;
    this.isSaving = false;
    this.isEdit = false;
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
    console.log(str, this.profileForm.get(['city']).value + ', ' + event.target.value);
    this.findLocalization(this.profileForm.get(['city']).value + ', ' + event.target.value);
  }

  saveProfile() {
    console.log('save profile');
  }
}
