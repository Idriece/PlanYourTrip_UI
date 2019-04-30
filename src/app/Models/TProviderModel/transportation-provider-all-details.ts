// this class is used to get us all the details associated with a particular transportation Provider
// this will get filled by the get details

import { TransportationProviderPriceDetails } from 'src/app/Models/TProviderModel/transportation-provider-price-details';

export class TransportationProviderAllDetails {
    TransportationProviderID: number;
    CityID: number;
    TransportationProviderName: number;
    Id: string;
    Email: string;
    CityName: string;
    TransportationPrices: Array<TransportationProviderPriceDetails>;
    constructor() {
        this.TransportationPrices = new Array<TransportationProviderPriceDetails>();
    }
}
