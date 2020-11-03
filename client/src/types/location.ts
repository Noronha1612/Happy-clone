export default interface ILocation {
    results: [{
        components: {
            city: string;
            state: string;
        }
    }]
}