import { UpdatedTProviderPrice } from 'src/app/Models/TProviderModel/updated-tprovider-price';

export class UpdatedTProvider {
    TransportationProviderID: number;
    CityID: number;
    TransportationProviderName: string;
    Id: string;
    updatedTProviderPrice: Array<UpdatedTProviderPrice>
    constructor() {
        this.updatedTProviderPrice = new Array<UpdatedTProviderPrice>();
    }
}
