import { Itinerary } from './itinerary'

export class Package {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public days: number,
        public Price: number,
        public summary: string,
        public numAvailable: number,
        public image: string,
        public minPeople: number,
        public maxPeople: number,
        public profitPercentage: number,
        public schedule: Itinerary[]
    ) { }
}
