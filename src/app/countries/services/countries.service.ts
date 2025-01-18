import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CaheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})

export class CountriesService {

    private API_URL: string = 'https://restcountries.com/v3.1';

    public cacheStore: CaheStore = {
        byCapital:      { txt: '', countries: [] },
        byCountries:    { txt: '', countries: [] },
        byRegion:       { region: '', countries: [] },
    }

    constructor(private http: HttpClient) {
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage() {
        if(!localStorage.getItem('cacheStore')) return;

        this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
    }

    private getContriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>( url )
        .pipe(
            catchError(() => of([])),
            // delay(2000)
        );
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {
        return this.http.get<Country[]>(`${this.API_URL}/alpha/${code}`)
        .pipe(
            map(countries => countries.length > 0 ? countries[0] : null),
            catchError(() => of(null))
        );
    }
    
    searchCapital(capital: string): Observable<Country[]> {
        return this.getContriesRequest(`${this.API_URL}/capital/${capital}`)
            .pipe(
                tap( countries => this.cacheStore.byCapital = { txt: capital, countries } ),
                tap( () => this.saveToLocalStorage() )
            );
    }

    searchCountry(country: string): Observable<Country[]> {
        return this.getContriesRequest(`${this.API_URL}/name/${country}`)
        .pipe(
            tap( countries => this.cacheStore.byCountries = { txt: country, countries } ),
            tap( () => this.saveToLocalStorage() )
        );
    }

    searchRegion(region: Region): Observable<Country[]> {
        return this.getContriesRequest(`${this.API_URL}/region/${region}`)
        .pipe(
            tap( countries => this.cacheStore.byRegion = { region, countries } ),
            tap( () => this.saveToLocalStorage() )
        );
    }
}