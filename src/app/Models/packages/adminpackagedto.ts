import {ItineraryDTO} from 'src/app/Models/packages/adminpackageitinerary';
export class AdminPackageDTO {
    public PackageID: number;
    public PackageName: string;
    public PackageTypeID: number;
    public Days: number;
    public Price: number;
    public Summary: string;
    public NumberAvailable: number;
    public Image: string;
    public MinPeople: number;
    public MaxPeople: number;
    public ProfitPercentage: number;
    public Itinerary: Array<ItineraryDTO>;
    constructor() {
        this.Itinerary = new Array<ItineraryDTO>();
    }
}
