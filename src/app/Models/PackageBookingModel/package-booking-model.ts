export class PackageBookingModel {
    constructor(
        public PackageID: number,
        public UserName: string,
        public NumPeople: number,
        public StartDate: Date,
        public EndDate: Date,
        public PaymentMethod: string,
        public IsCustomized: boolean,
        public TotalCost: number,
        public BookingStatus: string
    ) { }
}
