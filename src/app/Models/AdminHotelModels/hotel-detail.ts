import { RoomPrice } from './room-price';

export class HotelDetail {
    HotelName: string;
    UserId: string;
    CityId: number;
    Image: string;
    RoomPrices: Array<RoomPrice>;

    constructor() {
        this.RoomPrices = new Array<RoomPrice>();
    }

}
