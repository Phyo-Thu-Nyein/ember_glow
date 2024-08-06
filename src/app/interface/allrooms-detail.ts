// All Rooms Details
export interface AllRoomsDetails {
    status?:      string;
    message?:     string;
    data?:        AllRoomsDatum[];
    totalRooms?:  number;
    totalPages?:  number;
    currentPage?: number;
}

export interface AllRoomsDatum {
    id?:         string;
    room_number?: string;
    room_type?:   string;
    price?:       number;
    status?:      string;
    images?:      string[];
    description?: string;
    floor?:       number;
    capacity?:    number;
    amenities?:   string[];
    createdAt?:   Date;
    updatedAt?:   Date;
    __v?:         number;
}

// One Room Details
export interface OneRoomDetails {
    status?:  string;
    message?: string;
    data?:    OneRoomData;
}

export interface OneRoomData {
    id?:         string;
    room_number?: string;
    room_type?:   string;
    price?:       number;
    status?:      string;
    images?:      string[];
    description?: string;
    floor?:       number;
    capacity?:    number;
    amenities?:   string[];
    createdAt?:   Date;
    updatedAt?:   Date;
    __v?:         number;
}
