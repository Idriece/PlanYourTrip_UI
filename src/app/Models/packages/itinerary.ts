export class Itinerary {
    constructor (
        public id: number,
        public day: number,
        public city: string,
        public state: string,
        public hotel: string,
        public room: string,
        public trans: string,
        public activity: string
    ) { }
}
