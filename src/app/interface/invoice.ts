// Common interfaces
export interface ResponseStatus {
    status?:  string;
    message?: string;
}

export interface InvoiceData {
    _id?:                string;
    booking?:            string;
    user?:               Customer;
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

// Invoice Report interface
export interface InvoiceReport extends ResponseStatus {
    data?: ReportDatum[];
}

export interface ReportDatum {
    totalInvoices?:       number;
    totalRevenue?:        number;
    outstandingPayments?: number;
    month?:               number;
    year?:                number;
}

// One Invoice
export interface OneInvoice extends ResponseStatus {
    data?: OneInvoiceData;
}

export interface OneInvoiceData extends InvoiceData {}

// All Invoices
export interface AllInvoices extends ResponseStatus {
    data?:          InvoiceData[];
    totalInvoices?: number;
    totalPages?:    number;
    currentPage?:   number;
}

// Additional interfaces
export interface AdditionalService {
    description?: string;
    quantity?:    number;
    unitPrice?:   number;
    amount?:      number;
    _id?:         string;
}

export interface Customer extends User { 
    phone?: string;
    email?: string;
}

export interface CreatedBy extends User { }

export interface Room {
    _id?:         string;
    room_number?: string;
    room_type?:   string;
}

export interface User {
    _id?:  string;
    name?: string;
}
