import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private countriesApi = "https://restcountries.com/v3.1/all";
  public countriesList: Country[] = [];
  public filteredList: Country[] = [];
  private countriesListCopy;
  public regionsList: string[] = [];

  constructor(
    private http: HttpClient,
    private loadingCtlr: LoadingController
  ) {

  }

  async getCountriesFromApi() {
    const loadingData = await this.loadingCtlr.create({
      message: 'Loading...',
      spinner: "bubbles",
      backdropDismiss: false,
      translucent: true
    });
    loadingData.present();

    this.http.get(this.countriesApi).subscribe((countries: Country[]) => {
      this.countriesList = this.filteredList = countries;
      this.countriesListCopy = [...this.countriesList];
      loadingData.dismiss();
      this.getRegionsFromList();
    });
  }

  getRegionsFromList() {
    for (let country of this.countriesList) {
      if (!this.regionsList.includes(country.region)) {
        this.regionsList.push(country.region);
      }
    }
  }

  filterCountries(filterParam: string) {
    this.countriesList = this.countriesListCopy;
    if (filterParam == "noFilter") {
      return 0;
    }
    let filter = this.countriesList.filter(country => country.region == filterParam);
    this.countriesList = this.filteredList = filter;
  }
}

export interface Country {
  name: {
    common: string
  },
  region: string,
  subregion: string,
  capital: string[],
  coatOfArms: object,
  flags: object,
  timezones: string[],
  languages: object,
  population: string,
  area: number
}