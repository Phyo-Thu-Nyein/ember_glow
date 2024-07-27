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