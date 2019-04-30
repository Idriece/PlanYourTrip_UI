export class PaymentModel {
    constructor(
        public BookingID: number,
        public CreditCardNumber: string,
        public NameOnCard: string,
        public Amount: number
    ) { }
}
