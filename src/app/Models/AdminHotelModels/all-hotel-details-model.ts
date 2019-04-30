import { Roomprices } from 'src/app/Models/AdminHotelModels/room-prices';

export class AllHotelDetailsModel {
    HotelID: number;
    CityID: number;
    HotelName: string;
    Id: string;
    HotelImage: string;
    Email: string;
    CityName: string;
    RoomPrices: Roomprices[];

    constructor() {
        this.RoomPrices = new Array<Roomprices>();
    }
}
