// Booking details for payment
export interface BookingPaymentDetails {
    status?:  string;
    message?: string;
    data?:    BookingPaymentData;
}
export interface BookingPaymentData {
    _id?:           string;
    room?:          BookingPaymentRoom;
    user?:          BookingPaymentUser;
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
export interface BookingPaymentRoom {
    _id?:         string;
    room_number?: string;
}
export interface BookingPaymentUser {
    _id?:             string;
    name?:            string;
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
    room?:          AllBookingRoom;
    user?:          AllBookingUser;
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
export interface AllBookingRoom {
    _id?:           string;
    room_number?:   string;
    room_type?:     string;
}
export interface AllBookingUser {
    _id?:           string;
    name?:          string;
}

// One Booking (will use the same interfaces, MyBookingsRoom and MyBookingsUser from MyBookings)
export interface OneBooking {
    status?:  string;
    message?: string;
    data?:    OneBookingData;
}
export interface OneBookingData {
    _id?:           string;
    room?:          MyBookingsRoom;
    user?:          MyBookingsUser;
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
export enum BookingStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Failed = 'Failed',
    Cancelled = 'Cancelled',
    Archived = 'Archived'
}
export enum PaymentStatus {
    Pending = 'Pending',
    Paid = 'Paid',
    Failed = 'Failed',
    Cancelled = 'Cancelled'
}

// My Bookings
export interface MyBookings {
    status?:        string;
    message?:       string;
    data?:          MyBookingsDatum[];
    totalBookings?: number;
    totalPages?:    number;
    currentPage?:   number;
}
export interface MyBookingsDatum {
    _id?:           string;
    room?:          MyBookingsRoom;
    user?:          MyBookingsUser;
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
export interface MyBookingsRoom {
    _id?:           string;
    room_number?:   string;
    room_type?:     string;
    images?:        string[];
}
export interface MyBookingsUser {
    _id?:           string;
    name?:          string;
}

