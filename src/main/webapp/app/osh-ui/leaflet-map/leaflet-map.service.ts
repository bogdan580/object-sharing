/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@angular/core';
import { OSMSearchResponse } from 'app/osh-ui/leaflet-map/leaflet-map.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LeafletMapService {
  private search_map_url = 'https://nominatim.openstreetmap.org';
  constructor(private http: HttpClient) {}

  searchByAddress(address: string): Observable<OSMSearchResponse[]> {
    const options  = {
      params: {
        q: address,
        format: 'json',
        polygon_geojson: '1',
      },
    };
    return this.http.get<OSMSearchResponse[]>(this.search_map_url + '/search.php', options);
  }

  searchByLatLong(lat: number, lon: number) {
    const options = {
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
        format: 'json',
      },
    };
    return this.http.get(this.search_map_url + '/reverse.php', options);
  }
}
