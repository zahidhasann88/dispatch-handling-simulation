import { Component, OnInit, ViewChild } from '@angular/core';
import { DespatchEnvelopService } from 'src/app/services/despatch-envelop/despatch-envelop.service';
import Swal from 'sweetalert2';

// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexYAxis,
//   ApexStroke,
//   ApexTooltip,
//   ApexDataLabels,
//   ApexPlotOptions,
//   ApexResponsive,
//   ApexLegend,
//   ApexFill,
// } from 'ng-apexcharts';

// export type barChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   dataLabels: ApexDataLabels;
//   plotOptions: ApexPlotOptions;
//   responsive: ApexResponsive[];
//   xaxis: ApexXAxis;
//   legend: ApexLegend;
//   fill: ApexFill;
// };

// export type areaChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   yaxis: ApexYAxis;
//   stroke: ApexStroke;
//   tooltip: ApexTooltip;
//   dataLabels: ApexDataLabels;
//   legend: ApexLegend;
//   colors: string[];
// };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  envelops: any[] = [];
  user = JSON.parse(localStorage.getItem('currentUser'));

  // @ViewChild('chart') chart: ChartComponent;
  // public barChartOptions: Partial<barChartOptions>;
  // public areaChartOptions: Partial<areaChartOptions>;
  constructor(private despatchEnvelopService: DespatchEnvelopService) { }

  // // Doughnut chart start
  // public doughnutChartLabels: string[] = [
  //   'Development',
  //   'Java Classes',
  //   'Painting ',
  //   'Geography Class',
  // ];
  // public doughnutChartData: number[] = [32, 25, 20, 23];
  // public doughnutChartColors: any[] = [
  //   {
  //     backgroundColor: ['#5A5FAF', '#F7BF31', '#EA6E6C', '#28BDB8'],
  //   },
  // ];

  // public doughnutChartType = 'doughnut';
  // public doughnutChartOptions: any = {
  //   animation: false,
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   cutoutPercentage: 70,
  //   legend: {
  //     display: false,
  //   },
  // };

  // // Doughnut chart end

  ngOnInit() {
    // this.chart1();
    // this.chart2();
    this.getAllEnvelops();
  }

  getAllEnvelops() {
    let requestBody = {
      sent_to: this.user?.id,
    }
    this.despatchEnvelopService.getByCreatedFor(requestBody).subscribe(
      (t) => {
        this.envelops = t?.payload?.output ?? [];
      },
      (f) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
      }
    );
  }

  // private chart1() {
  //   this.areaChartOptions = {
  //     series: [
  //       {
  //         name: 'Mathes',
  //         data: [31, 40, 28, 51, 42, 85, 77],
  //       },
  //       {
  //         name: 'Science',
  //         data: [11, 32, 45, 32, 34, 52, 41],
  //       },
  //     ],
  //     chart: {
  //       height: 350,
  //       type: 'area',
  //       toolbar: {
  //         show: false,
  //       },
  //       foreColor: '#9aa0ac',
  //     },
  //     colors: ['#F77A9A', '#A054F7'],
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: 'smooth',
  //     },
  //     xaxis: {
  //       categories: [
  //         'test 1',
  //         'test 2',
  //         'test 3',
  //         'test 4',
  //         'test 5',
  //         'test 6',
  //         'test 7',
  //       ],
  //     },
  //     legend: {
  //       show: true,
  //       position: 'top',
  //       horizontalAlign: 'center',
  //       offsetX: 0,
  //       offsetY: 0,
  //     },
  //   };
  // }

  // private chart2() {
  //   this.barChartOptions = {
  //     series: [
  //       {
  //         name: 'Physics',
  //         data: [44, 55, 41, 67, 22, 43],
  //       },
  //       {
  //         name: 'Computer',
  //         data: [13, 23, 20, 8, 13, 27],
  //       },
  //       {
  //         name: 'Management',
  //         data: [11, 17, 15, 15, 21, 14],
  //       },
  //       {
  //         name: 'Mathes',
  //         data: [21, 7, 25, 13, 22, 8],
  //       },
  //     ],
  //     chart: {
  //       type: 'bar',
  //       height: 330,
  //       foreColor: '#9aa0ac',
  //       stacked: true,
  //       toolbar: {
  //         show: false,
  //       },
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           legend: {
  //             position: 'bottom',
  //             offsetX: -10,
  //             offsetY: 0,
  //           },
  //         },
  //       },
  //     ],
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '20%',
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     xaxis: {
  //       type: 'category',
  //       categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  //     },
  //     legend: {
  //       show: false,
  //     },
  //     fill: {
  //       opacity: 1,
  //       colors: ['#25B9C1', '#4B4BCB', '#EA9022', '#9E9E9E'],
  //     },
  //   };
  // }
}
