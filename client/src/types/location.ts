export interface ILocation extends ILocationResponse {
    coords: {
        latitude: number;
        longitude: number;
    }
}

export interface ILocationResponse {
    results: [{
        components: {
            city: string;
            state: string;
        }
    }]
}