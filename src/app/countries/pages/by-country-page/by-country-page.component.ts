import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {

    public countries: Country[] = [];
    public initialValue: string = '';

    constructor(private countriesService: CountriesService) {}

    ngOnInit(): void {
        this.countries = this.countriesService.cacheStore.byCountries.countries;
        this.initialValue = this.countriesService.cacheStore.byCountries.txt;
    }

    searchByCountry(country: string): void {
      this.countriesService.searchCountry(country)
      .subscribe( c => this.countries = c);
    }
}
