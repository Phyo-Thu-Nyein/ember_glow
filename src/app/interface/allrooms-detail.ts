export interface AllRoomsDetails {
    status?:      string;
    message?:     string;
    data?:        AllRoomsDatum[];
    totalRooms?:  number;
    totalPages?:  number;
    currentPage?: number;
}

export interface AllRoomsDatum {
    _id?:         string;
    room_number?: string;
    room_type?:   string;
    price?:       number;
    status?:      string;
    images?:      null;
    description?: string;
    checkIn?:     Date;
    checkOut?:    Date;
    createdAt?:   Date;
    updatedAt?:   Date;
    __v?:         number;
}
