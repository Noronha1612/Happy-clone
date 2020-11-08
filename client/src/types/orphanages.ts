export interface IOrphanageResponse {
    error: boolean;
    message?: string;
    data?: IOrphanage[];
}

export interface IOrphanage {
    id: number
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