import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'app-by-capital-page',
    templateUrl: './by-capital-page.component.html',
    styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

    public countries: Country[] = [];
    public isLoading: boolean = false;
    public initialValue: string = '';

    constructor(private countriesService: CountriesService) {}

    ngOnInit(): void {
        this.countries = this.countriesService.cacheStore.byCapital.countries;
        this.initialValue = this.countriesService.cacheStore.byCapital.txt;
    }

    searchByCapital(capital: string): void {
        this.isLoading = true;
        this.countriesService.searchCapital(capital)
        .subscribe(c => {
            this.countries = c;
            this.isLoading = false;
        } );
    }

}
