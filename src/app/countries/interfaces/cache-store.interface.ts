import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CaheStore {
    byCapital:      TermCountries;
    byCountries:    TermCountries;
    byRegion:       RegionCountries;
}

export interface TermCountries {
    txt: string;
    countries: Country[];
}

export interface RegionCountries {
    region:    Region;
    countries:  Country[];
}
