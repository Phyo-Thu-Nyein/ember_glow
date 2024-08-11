// Invoice Report interface
export interface InvoiceReport {
    status?:  string;
    message?: string;
    data?:    ReportDatum[];
}
export interface ReportDatum {
    totalInvoices?:       number;
    totalRevenue?:        number;
    outstandingPayments?: number;
    month?:               number;
    year?:                number;
}

// All Invoices
export interface AllInvoices {
    status?:        string;
    message?:       string;
    data?:          AllInvoicesDatum[];
    totalInvoices?: number;
    totalPages?:    number;
    currentPage?:   number;
}
export interface AllInvoicesDatum {
    _id?:                string;
    booking?:            string;
    user?:               CreatedBy;
    room?:               Room;
    checkIn?:            Date;
    checkOut?:           Date;
    status?:             string;
    totalNights?:        number;
    roomRate?:           number;
    totalAmount?:        number;
    paymentMethod?:      string;
    additionalServices?: AdditionalService[];
    createdBy?:          CreatedBy;
    createdAt?:          Date;
    updatedAt?:          Date;
    __v?:                number;
}

export interface AdditionalService {
    description?: string;
    amount?:      number;
    _id?:         string;
}

export interface CreatedBy {
    _id?:  string;
    name?: string;
}

export interface Room {
    _id?:         string;
    room_number?: string;
}
