import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ReportDatum, InvoiceReport } from 'src/app/interface/invoice';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-invoice-dashboard',
  templateUrl: './invoice-dashboard.component.html',
  styleUrls: ['./invoice-dashboard.component.css'],
})
export class InvoiceDashboardComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Subscriptions
  invoiceReportSub: Subscription = new Subscription();

  // Variables
  originalData: ReportDatum[] = []; // This will store the full dataset
  totalRevenueSum: number = 0;
  totalInvoiceCount: number = 0;
  thisYearRevenueSum: number = 0;
  activeTimeFrame: string = 'all'; // Add an active effect to selected time frame

  // Boolean variable to track the chart type
  isLineChart: boolean = true;

  // Line Chart configuration
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Revenue',
        // fill: true,
        pointHoverBorderWidth : 6,
        pointBorderColor : 'rgba(0,255,0,0.3)',
        pointBorderWidth : 4,
        pointBackgroundColor: 'rgba(0,255,0,0.6)',
        borderColor: 'rgba(0,255,0,0.6)',
        hoverBackgroundColor: 'rgba(0,255,0,0.6)',
        tension: 0.1,
        backgroundColor: 'rgba(0,255,0,0.3)',
        yAxisID: 'y-axis-0',
      },
      {
        data: [],
        label: 'Total Invoices',
        // fill: true,
        pointHoverBorderWidth : 6,
        pointBorderColor : 'rgba(0,0,255,0.3)',
        pointBorderWidth : 4,
        pointBackgroundColor: 'rgba(0,0,255,0.6)',
        borderColor: 'rgba(0,0,255,0.6)',
        hoverBackgroundColor: 'rgba(0,0,255,0.6)',
        tension: 0.1,
        backgroundColor: 'rgba(0,0,255,0.3)',
        yAxisID: 'y-axis-1',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          autoSkip: true,
          maxTicksLimit: 20, // Adjust based on your needs
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getInvoiceReport();
  }
  ngOnDestroy(): void {
    if (this.invoiceReportSub) {
      this.invoiceReportSub.unsubscribe();
    }
  }

  // LOGICS
  // Get the invoice report
  getInvoiceReport() {
    this.invoiceReportSub = this.apiService.getInvoiceReport().subscribe({
      next: (report: InvoiceReport) => {
        const currentYear = new Date().getFullYear(); // Get current year
        this.originalData = report.data || [];
        this.updateChartData(this.originalData); // Initialize with all data

        console.log('Full Report:', report); // Log the entire report

        // Extract data for the chart
        const labels: string[] = [];
        const revenueData: number[] = [];
        const invoiceCountData: number[] = [];
        let thisYearRevenue = 0; // Initialise with 0

        report.data?.forEach((datum: ReportDatum) => {
          labels.push(`${this.getMonthName(datum.month!)} ${datum.year}`);
          revenueData.push(datum.totalRevenue || 0);
          invoiceCountData.push(datum.totalInvoices || 0);

          // Aggregate revenue for the current year
          if (datum.year === currentYear) {
            thisYearRevenue += datum.totalRevenue || 0;
          }
        });

        // Update the chart data
        this.lineChartData.labels = labels;
        this.lineChartData.datasets[0].data = revenueData;
        this.lineChartData.datasets[1].data = invoiceCountData;

        // Calculate totals
        this.totalRevenueSum = revenueData.reduce((acc, curr) => acc + curr, 0);
        this.totalInvoiceCount = invoiceCountData.reduce((acc, curr) => acc + curr, 0);
        this.thisYearRevenueSum = thisYearRevenue; // Update this year revenue

        // Force chart update after setting data
        this.updateChart();
      },
      error: (err) => {
        console.log('Error fetching invoice report.', err.error.message);
      },
    });
  }

  // Convert month number to month name
  private getMonthName(monthNumber: number): string {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[monthNumber - 1];
  }

  // Method to update the chart explicitly
  private updateChart() {
    // Use ViewChild to access and update the chart
    if (this.chart) {
      this.chart.update();
    }
  }

  setTimeFrame(timeFrame: string) {
    const currentYear = new Date().getFullYear();
    let filteredData = this.originalData; // Assuming this.originalData holds all your data

    if (timeFrame === 'thisYear') {
      filteredData = this.originalData.filter((d) => d.year === currentYear);
    } else if (timeFrame === 'lastYear') {
      filteredData = this.originalData.filter(
        (d) => d.year === currentYear - 1
      );
    }

    this.updateChartData(filteredData);
    this.activeTimeFrame = timeFrame; 
  }

  updateChartData(data: ReportDatum[]) {
    this.lineChartData.labels = data.map(
      (d) => `${this.getMonthName(d.month!)} ${d.year}`
    );
    this.lineChartData.datasets[0].data = data.map((d) => d.totalRevenue!);
    this.lineChartData.datasets[1].data = data.map((d) => d.totalInvoices!);
    this.chart?.update();
  }


  // Toggle button to change chart type
  toggleChartType() {
    this.isLineChart = !this.isLineChart;
  }
}
