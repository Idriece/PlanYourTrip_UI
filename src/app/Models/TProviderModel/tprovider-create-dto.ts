import { TransportationPriceDTO } from 'src/app/Models/TProviderModel/transportation-price-dto';

export class TProviderCreateDTO {
    TransportationProviderName: string;
    UserId: string;
    CityId: number;
    TransportationPrices: Array<TransportationPriceDTO>;
    constructor() {
        this.TransportationPrices = new Array<TransportationPriceDTO>();
    }

}
