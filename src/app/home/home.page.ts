import { Component } from '@angular/core';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public countriesService: CountriesService
  ) { }

  ngOnInit() {
    this.countriesService.getCountriesFromApi();
  }


  searchCountry($event) {
    const value = $event.target.value;
    if (value && value.trim() !== '') {
      this.countriesService.countriesList = this.countriesService.filteredList.filter((current) => {
        let countryName = current.name.common.toLowerCase().toString().indexOf(value.toLowerCase());
        if (countryName > -1) {
          return current.name.common.toLowerCase().replace(value.toLowerCase(), value);
        }
      });
    }
    else {
      this.countriesService.countriesList = this.countriesService.filteredList;
    }
  }

  filterCountries($event) {
    this.countriesService.filterCountries($event.detail.value);
  }

}
