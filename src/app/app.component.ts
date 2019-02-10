import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddresseService } from './service/addresse-service';
import {debounceTime, finalize, startWith, switchMap, tap} from 'rxjs/operators';
import {FeatureGeocodeJSON} from './geocode-json-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-gouv-address';

  myControl = new FormControl();
  options: [];
  isLoading = false;

  constructor(private adresseServce: AddresseService) {
    this.myControl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      tap(() => this.isLoading = true),
        switchMap(value => this.adresseServce.search(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
    ).subscribe(response => {
      console.log(response); this.options = response.features; });
  }

  displayFn(option ?: FeatureGeocodeJSON): string | undefined {
    return option ? option.properties.label : undefined;
  }

}
