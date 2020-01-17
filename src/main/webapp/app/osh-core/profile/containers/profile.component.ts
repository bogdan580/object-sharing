import { Component, OnInit } from '@angular/core';
import { LeafletMapService } from 'app/osh-ui/leaflet-map/leaflet-map.service';
import { OSMSearchResponse } from 'app/osh-ui/leaflet-map/leaflet-map.model';
import { Subscription } from 'rxjs';
import { Point } from 'leaflet';
import { FormBuilder, Validators } from '@angular/forms';
import { OshProfileService } from '../shared/services/profile.service';
import { ProfileData } from 'app/shared/model/osh/profile.model';

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  addressSub: Subscription;
  startPoint: Point;
  zoom = 14;
  profileData: ProfileData;

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

  constructor(private fb: FormBuilder, private mapService: LeafletMapService, private profileService: OshProfileService) {
    this.startPoint = null;
    this.isSaving = false;
    this.isEdit = false;
    this.profileService.myProfileData().subscribe(data => {
      console.log('data', data);
      this.profileData = data;
      this.initProfileForm();
    });
  }

  initProfileForm() {
    this.profileForm.patchValue({
      userInfoId: this.profileData.userInfo.id,
      tel: this.profileData.userInfo.tel,
      firstName: this.profileData.userInfo.user.firstName,
      lastName: this.profileData.userInfo.user.lastName,
      email: this.profileData.userInfo.user.email,
      locationId: this.profileData.location.id,
      streetAddress: this.profileData.location.streetAddress,
      postalCode: this.profileData.location.postalCode,
      city: this.profileData.location.city,
      stateProvince: this.profileData.location.stateProvince
    });
    this.setNewAddress('initProfileForm', null);
  }

  ngOnInit() {
  }

  findLocalization(address: string) {
    console.log('find localization: ', address);
    this.addressSub = this.mapService.searchByAddress(address).subscribe((res: OSMSearchResponse[]) => {
      console.log('res', res);
      if (res.length > 0) {
        this.startPoint = new Point(+res[0].lat, +res[0].lon);
      } else {
        window.alert('Address not found. Please write correct address.');
      }
      this.addressSub.unsubscribe();
    });
  }

  setNewAddress(str: string, event: any) {
    console.log(str, this.profileForm.get(['city']).value + ', ' + this.profileForm.get(['streetAddress']).value);
    this.findLocalization(this.profileForm.get(['city']).value + ', ' + this.profileForm.get(['streetAddress']).value);
  }

  saveProfile() {
    this.isEdit = false;
    console.log('save profile');
    //todo create if null and set data from form
    if (!this.profileData.userInfo) {
      console.error('User Info is null');
      return null;
    }
    this.profileData.userInfo.tel = this.profileForm.get(['tel']).value;
    this.profileData.userInfo.user.firstName = this.profileForm.get(['firstName']).value;
    this.profileData.userInfo.user.lastName = this.profileForm.get(['lastName']).value;
    this.profileData.userInfo.user.email = this.profileForm.get(['email']).value;
    if (!this.profileData.location) {
      this.profileData.location = {};
    }
    this.profileData.location.streetAddress = this.profileForm.get(['streetAddress']).value;
    this.profileData.location.city = this.profileForm.get(['city']).value;
    this.profileData.location.postalCode = this.profileForm.get(['postalCode']).value;
    this.profileData.location.stateProvince = this.profileForm.get(['stateProvince']).value;
    this.profileData.location.lat = this.startPoint.x;
    this.profileData.location.lon = this.startPoint.y;
    console.log(this.profileData);
    this.profileService.createOrUpdateProfileData(this.profileData).subscribe(res => {
      console.log('res', res);
      this.profileData = res;
    });
  }
}
