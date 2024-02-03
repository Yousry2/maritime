type Point = { lat: number; lng: number; speed: number; leg_duration: number };
export enum RouteColor {
     RED = '#d03232',
     YELLOW = '#d7f03a',
     BLUE = '#3a4ff0',
     GREEN = '#057517',
}
export type PolylineOptions = {
     route_id: string;
     from_port: string;
     to_port: string;
     leg_duration: number;
     speed: number;
     path: google.maps.LatLng[];
     strokeColor?: string;
     strokeOpacity?: number;
     strokeWeight?: number;
};
export type Route = {
     route_id: string;
     from_port: string;
     to_port: string;
     leg_duration: number;
     speed: number;
     points: Point[];
};
