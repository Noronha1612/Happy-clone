export interface IOrphanage {
    name: string;
    whatsapp: string;
    about: string;
    instructions: string;
    location: {
        latitude: number;
        longitude: number;
    };
    photoUrls: string[];
    open_hours: string;
    open_on_weekends: boolean;
}