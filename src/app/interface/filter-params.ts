// User filters
export interface UserFilterParams {
    page:           number;
    limit:          number;
    sortBy:         string;
    sortOrder:      string;
    filterByRole:   string;
    name:           string;
}
  
// Room filters
export interface RoomFilterParams {
  page:           number;
  limit:          number;
  sortBy:         string;
  sortOrder:      string;
  roomType:       string;
  roomNumber:     string;
  status:         string;
  minPrice:       number;
  maxPrice:       number;
  checkIn:        string;
  checkOut:       string;
}

// My Bookings filters
export interface MyBookingsFilterParams {
  page:           number;
  limit:          number;
  sortBy:         string;
  orderBy:        string;
  status:         string;
}

// All Bookings filters
export interface AllBookingsFilterParams {
  page:           number;
  limit:          number;
  sortBy:         string;
  sortOrder:      string;
  roomNumber:     string;
  // userName:       string;
  bookingStatus:  string;
  paymentStatus:  string;
  bookingId:      string;
}

// All Invoices Filters
export interface AllInvoicesFilterParams {
  page:           number;
  limit:          number;
  sortBy:         string;
  sortOrder:      string;
  status:         string;
  user:           string;
  room:           string;
  bookingId:      string;
}