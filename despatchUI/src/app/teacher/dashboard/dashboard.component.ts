import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { DespatchEnvelopService } from 'src/app/services/despatch-envelop/despatch-envelop.service';
import Swal from 'sweetalert2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexFill,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { User } from 'src/app/core/models/user';

export type avgLecChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public avgLecChartOptions: Partial<avgLecChartOptions>;
  public pieChartOptions: Partial<pieChartOptions>;
  registration_clerks: any[] = [];
  form: FormGroup;
  form2: FormGroup;
  isForm2Visibile: boolean = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private formBuilder: FormBuilder, private despatchEnvelopService: DespatchEnvelopService, private userInfoService: UserInfoService) { }
  ngOnInit() {
    // this.chart1();
    // this.chart2();
    this.getAllRegistrationClerks();
    this.form = this.formBuilder.group({
      id: [null],
      letter_no: [null, [Validators.required]],
      date_time_group: [null],
      originator_no: [null],
      from_address: [null],
      to_address: [null],
      precedance: [null],
      security_classification: [null],
      created_by: [null],
      created_at: [null],
      updated_by: [null],
      updated_at: [null],
      isSendTicked: [false],
      despatch_envelop_id: [null],
      sent_from: [null],
      sent_to: [null],
    });
    this.form2 = this.formBuilder.group({
      id: [null],
      letter_no: [null, [Validators.required]],
      date_time_group: [null],
      originator_no: [null],
      from_address: [null],
      to_address: [null],
      precedance: [null],
      security_classification: [null],
      created_by: [null],
      created_at: [null],
      updated_by: [null],
      updated_at: [null],
      isSendTicked: [false],
      despatch_envelop_id: [null],
      sent_from: [null],
      sent_to: [null],
    });
  }

  getAllRegistrationClerks() {
    let requestBody = {
      user_role: 'registration_clerk'
    }
    this.userInfoService.getByRole(requestBody).subscribe(
      (t) => {
        this.registration_clerks = t?.payload?.output;
      },
      (f) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
      }
    );
  }

  onDuplicateButtonClick() {
    this.isForm2Visibile = !this.isForm2Visibile;
    this.form2.patchValue(this.form.value);
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.patchValue({ created_by: JSON.parse(localStorage.getItem('currentUser'))?.id });
      // this.form.patchValue({ created_at: new Date() });
      this.form.patchValue({ updated_by: JSON.parse(localStorage.getItem('currentUser'))?.id });
      // this.form.patchValue({ updated_at: new Date() });
      this.despatchEnvelopService.create(this.form.value).subscribe(
        (t) => {
          Swal.fire({ icon: 'success', title: 'Success!', text: t?.message ?? 'Operation Successful.' });
          this.form.patchValue({ despatch_envelop_id: t?.payload?.output?.id });
        },
        (f) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
        }
      );
    }
  }

  onSubmit2() {
    if (this.form2.valid) {
      this.form.patchValue({ created_by: JSON.parse(localStorage.getItem('currentUser'))?.id });
      // this.form.patchValue({ created_at: new Date() });
      this.form.patchValue({ updated_by: JSON.parse(localStorage.getItem('currentUser'))?.id });
      // this.form.patchValue({ updated_at: new Date() });
      this.despatchEnvelopService.create(this.form2.value).subscribe(
        (t) => {
          Swal.fire({ icon: 'success', title: 'Success!', text: t?.message ?? 'Operation Successful.' });
          this.form.patchValue({ despatch_envelop_id: t?.payload?.id });
        },
        (f) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
        }
      );
    }

  }

  onSend() {
    if (this.form.valid) {
      if (this.form.get('isSendTicked')?.value == true && this.form.get('sent_to')?.value != null && this.form.get('despatch_envelop_id')?.value != null) {
        this.form.patchValue({ sent_from: Number(this.user?.id) });
        this.despatchEnvelopService.createDespatchEnvelopDistribution(this.form.value).subscribe(
          (t) => {
            Swal.fire({ icon: 'success', title: 'Success!', text: t?.message ?? 'Operation Successful.' });
          },
          (f) => {
            Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
          }
        );
      }
    }
  }

  onSend2() {
    if (this.form2.valid) {
      if (this.form2.get('isSendTicked')?.value == true && this.form2.get('sent_to')?.value != null && this.form2.get('despatch_envelop_id')?.value != null) {
        this.form2.patchValue({ sent_from: Number(this.user?.id) });
        this.despatchEnvelopService.createDespatchEnvelopDistribution(this.form2.value).subscribe(
          (t) => {
            Swal.fire({ icon: 'success', title: 'Success!', text: t?.message ?? 'Operation Successful.' });
          },
          (f) => {
            Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
          }
        );
      }
    }
  }

  
  // private chart1() {
  //   this.avgLecChartOptions = {
  //     series: [
  //       {
  //         name: 'Avg. Lecture',
  //         data: [65, 72, 62, 73, 66, 74, 63, 67],
  //       },
  //     ],
  //     chart: {
  //       height: 350,
  //       type: 'line',
  //       foreColor: '#9aa0ac',
  //       dropShadow: {
  //         enabled: true,
  //         color: '#000',
  //         top: 18,
  //         left: 7,
  //         blur: 10,
  //         opacity: 0.2,
  //       },
  //       toolbar: {
  //         show: false,
  //       },
  //     },
  //     stroke: {
  //       curve: 'smooth',
  //     },
  //     xaxis: {
  //       categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug'],
  //       title: {
  //         text: 'Weekday',
  //       },
  //     },
  //     yaxis: {},
  //     fill: {
  //       type: 'gradient',
  //       gradient: {
  //         shade: 'dark',
  //         gradientToColors: ['#35fdd8'],
  //         shadeIntensity: 1,
  //         type: 'horizontal',
  //         opacityFrom: 1,
  //         opacityTo: 1,
  //         stops: [0, 100, 100, 100],
  //       },
  //     },
  //     markers: {
  //       size: 4,
  //       colors: ['#FFA41B'],
  //       strokeColors: '#fff',
  //       strokeWidth: 2,
  //       hover: {
  //         size: 7,
  //       },
  //     },
  //     tooltip: {
  //       theme: 'dark',
  //       marker: {
  //         show: true,
  //       },
  //       x: {
  //         show: true,
  //       },
  //     },
  //   };
  // }

  // private chart2() {
  //   this.pieChartOptions = {
  //     series: [44, 55, 13, 43, 22],
  //     chart: {
  //       type: 'donut',
  //       width: 200,
  //     },
  //     legend: {
  //       show: false,
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     labels: ['Science', 'Mathes', 'Economics', 'History', 'Music'],
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {},
  //       },
  //     ],
  //   };
  // }
}
