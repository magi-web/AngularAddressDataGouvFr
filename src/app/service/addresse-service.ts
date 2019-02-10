import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {GeocodeJSON} from '../geocode-json-response';

@Injectable()
export class AddresseService {
  public static readonly SERVICE_NAME: string = 'adresseDataGouvFrService';
  public static readonly BASE_URL: string = 'https://api-adresse.data.gouv.fr';

  constructor(private httpClient: HttpClient) {

  }

  search(value: any): Observable<any> {
    if (typeof value === 'string' && value.length >= 3) {
      const params = new HttpParams()
        .set('q', value);
      return this.httpClient.get<GeocodeJSON>(AddresseService.BASE_URL + '/search', {params});
    } else {
      return of([]);
    }
  }
}
