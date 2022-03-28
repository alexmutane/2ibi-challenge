import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
})
export class CountryDetailPage implements OnInit {

  public countryInfo: Country;
  public countryLangs = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private exportService: ExportService
  ) { }

  async ngOnInit() {
    if (this.countriesService.countriesList.length == 0) {
      this.countriesService.getCountriesFromApi();
    }

    this.countryInfo = this.countriesService.countriesList.find(country => country.name.common == this.activatedRoute.snapshot.params['countryName']);
    this.manageCountryLanguages(this.countryInfo);
  }

  manageCountryLanguages(country: Country) {
    if (country.languages == null) { return 0; }
    this.countryLangs = Object.values(country.languages);
  }

  formatPopulationNumber(number: Number) {
    return number.toLocaleString();
  }

  exportInfo(country: Country, fileType: string) {

  }

}
