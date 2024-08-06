// Base interface for common booking fields
interface BaseBooking {
  _id?: string;
  room?: Room;
  user?: User;
  checkIn?: Date;
  checkOut?: Date;
  status?: string;
  paymentMethod?: string;
  paymentProof?: string;
  paymentStatus?: string;
  totalPrice?: number;
  specialRequests?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  duration?: number;
}

// Base interface for API response metadata
interface ApiResponseMetadata {
  status?: string;
  message?: string;
}

// Interface for pagination metadata
interface PaginationMetadata {
  totalBookings?: number;
  totalPages?: number;
  currentPage?: number;
}

// Inheritance
// Interface for a single booking response
export interface OneBooking extends ApiResponseMetadata {
  data?: OneBookingData;
}
// Interface for the data of a single booking
export interface OneBookingData extends BaseBooking {}

// Interface for a list of bookings response
export interface Bookings extends ApiResponseMetadata, PaginationMetadata {
  data?: BookingsDatum[];
}
// Interface for the data of multiple bookings
export interface BookingsDatum extends BaseBooking {}

// Room interface remains the same
export interface Room {
  _id?: string;
  room_number?: string;
  room_type?: string;
  images?: string[]; // IMPORTANT: This response won't be present in all/new bookings
}

// User interface remains the same
export interface User {
  _id?: string;
  name?: string;
}

// Enums for status
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
