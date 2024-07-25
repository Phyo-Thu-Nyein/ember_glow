// Booking details for payment
export interface BookingPaymentDetails {
    status?:  string;
    message?: string;
    data?:    BookingPaymentData;
}
export interface BookingPaymentData {
    _id?:           string;
    room?:          Room;
    user?:          User;
    checkIn?:       Date;
    checkOut?:      Date;
    status?:        string;
    paymentMethod?: string;
    paymentProof?:  string;
    paymentStatus?: string;
    createdAt?:     Date;
    updatedAt?:     Date;
    __v?:           number;
}
export interface Room {
    _id?:         string;
    room_number?: string;
}
export interface User {
    _id?:             string;
    normalized_name?: string;
}

// All bookings
export interface AllBookings {
    status?:        string;
    message?:       string;
    data?:          AllBookingsDatum[];
    totalBookings?: number;
    totalPages?:    number;
    currentPage?:   number;
}
export interface AllBookingsDatum {
    _id?:           string;
    room?:          string;
    user?:          string;
    checkIn?:       Date;
    checkOut?:      Date;
    status?:        string;
    paymentMethod?: string;
    paymentProof?:  string;
    paymentStatus?: string;
    createdAt?:     Date;
    updatedAt?:     Date;
    __v?:           number;
}

// One Booking
export interface OneBooking {
    status?:  string;
    message?: string;
    data?:    OneBookingData;
}

export interface OneBookingData {
    _id?:           string;
    room?:          string;
    user?:          string;
    checkIn?:       Date;
    checkOut?:      Date;
    status?:        string;
    paymentMethod?: string;
    paymentProof?:  string;
    paymentStatus?: string;
    createdAt?:     Date;
    updatedAt?:     Date;
    __v?:           number;
}
