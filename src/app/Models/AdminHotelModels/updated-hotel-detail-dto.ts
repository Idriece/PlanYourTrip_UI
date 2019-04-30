import { UpdatedHotelPriceDTO } from 'src/app/Models/AdminHotelModels/updated-hotel-price-dto';

export class UpdatedHotelDetailDTO {
    HotelID: number;
    CityID: number;
    HotelName: string;
    Id: string;
    HotelImage: string;
    updatedHotelPriceDTO: Array<UpdatedHotelPriceDTO>;

    constructor() {
        this.updatedHotelPriceDTO = new Array<UpdatedHotelPriceDTO>();
    }
}
