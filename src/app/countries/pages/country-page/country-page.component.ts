import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'app-country-page',
    templateUrl: './country-page.component.html',
    styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {

    public country?: Country;

    constructor(
        private activateRoure: ActivatedRoute,
        private countriesService: CountriesService,
        private router: Router) {}

    ngOnInit(): void {
        this.activateRoure.params
        .pipe(
            switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id))
        )
        .subscribe((country) => {
            if(!country) return this.router.navigateByUrl('by-capital');
            return this.country = country;
        })
    }
}
