interface OpenHours {
    hours: number;
    minutes: number;
}

export interface Orphanage {
    name: string;
    whatsapp: string;
    about: string;
    instructions: string;
    location: {
        latitude: number;
        longitude: number;
    };
    photoUrls: string[];
    open_hours: OpenHours[];
    open_on_weekends: boolean;
}