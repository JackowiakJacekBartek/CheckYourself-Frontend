import { Component, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: any;
  chart: ApexChart;
  dataLabels: ApexDataLabels | undefined;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-donut-chart',
  template: `
    <div id="chart">
    <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart || { type: 'donut' }"
        [dataLabels]="chartOptions.dataLabels || {}"
        [plotOptions]="chartOptions.plotOptions || {}"
        [yaxis]="chartOptions.yaxis || {}"
        [xaxis]="chartOptions.xaxis || {}"
        [fill]="chartOptions.fill || {}"
        [title]="chartOptions.title || {}"
        [labels]="chartOptions.labels"
        [legend]="chartOptions.legend || {}"
        [colors]="chartOptions.colors || []"
    ></apx-chart>
    </div>
  `,
})
export class DonutChartComponent {
    @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

    @Input() userScore!: number;
    @Input() totalScore!: number;
    

  constructor(private cdr: ChangeDetectorRef) {}
    
  ngOnInit(): void {

    this.chartOptions = {
      series: this.userScore === this.totalScore ? [100] : [this.userScore, this.totalScore-this.userScore],
      chart: {
        height: 500,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                show: true,
                formatter: (val) => {
                    console.log('xxx',val);
                  return Number(val) * 10 + ' %';
                }
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w) => {
                    console.log(w.globals.seriesTotals);
                    if (this.userScore === this.totalScore) {
                        return '100 %';
                    }
                
                    const percentage = (w.globals.seriesTotals[0] / (w.globals.seriesTotals[1]+w.globals.seriesTotals[0])) * 100;
                    return percentage.toFixed(0) + ' %';
                }
              }
            }
          }
        }
      },
      colors: [
        '#00A993',
        '#EB4335',
      ],
      labels: ['Poprawne odp.', 'Niepoprawne odp.'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        // show: false
        position: 'bottom'
      },
    };
  }
}
