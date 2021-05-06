import { Component, OnInit, OnDestroy, NgZone, TemplateRef } from '@angular/core';
import { User } from 'src/assets/mock/admin-user/users.model'
import { MocksService } from 'src/app/shared/services/mocks/mocks.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import * as moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_frozen);
am4core.useTheme(am4themes_animated);

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  // Chart
  private chart0;
  private chart1;
  private chart2;
  private chart3;

  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-lg modal-dialog-centered"
  };

  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any = [
    {
      reportName: "Laporan Potongan Gaji",
      reportDesc: "Gaji yang berjaya/gagal dipotong",
      outDate: "2/3/2021",
      designate: "Admin"
    },
    {
      reportName: "Laporan Perumahan",
      reportDesc: "Rumah yang sudah mencapai tahap piawai yang ditetapkan",
      outDate: "1/1/2021",
      designate: "Daerah Bera"
    },
    {
      reportName: "Laporan transaksi",
      reportDesc: "Antara anggota dan peniaga berkenaan alat-alat bantuan",
      outDate: "20/11/2020",
      designate: "Daerah Sri Bayu"
    }
  ]
  SelectionType = SelectionType;

  // Datepicker
  bsDPConfig = { 
    isAnimated: true, 
    containerClass: 'theme-default'
  }

  constructor(
    private modalService: BsModalService,
    private mockService: MocksService,
    private zone: NgZone
  ) {
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
  }

  ngOnInit() {
    this.getCharts()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart0) {
        this.chart0.dispose()
      }
      if (this.chart1) {
        this.chart1.dispose()
      }
      if (this.chart2) {
        this.chart2.dispose()
      }
    })
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartReadPerRKAT()
      this.getChartRoutePerRKAT()
      this.getChartUsePerMonth()
    })
  }

  getChartReadPerRKAT() {
    let chart = am4core.create("chartReadPerRKAT", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "1",
        value: 401
      },
      {
        country: "2",
        value: 300
      },
      {
        country: "3",
        value: 200
      },
      {
        country: "4",
        value: 165
      }
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;  

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "country";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    chart.legend = new am4charts.Legend();

    this.chart0 = chart
  }

  getChartRoutePerRKAT() {
    let chart = am4core.create("chartRoutePerRKAT", am4charts.PieChart);

    // Add data
    chart.data = [ {
      "country": "1",
      "litres": 501.9
    }, {
      "country": "2",
      "litres": 301.9
    }, {
      "country": "3",
      "litres": 201.1
    }, {
      "country": "4",
      "litres": 165.8
    }];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chart1 = chart
  }

  getChartUsePerMonth() {
    let chart = am4core.create("chartUsePerMonth", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = [{
      "country": "Jan",
      "value": 3025
    }, {
      "country": "Feb",
      "value": 1882
    }, {
      "country": "March",
      "value": 1809
    }, {
      "country": "April",
      "value": 1322
    }, {
      "country": "May",
      "value": 1122
    }, {
      "country": "June",
      "value": 1114
    }, {
      "country": "July",
      "value": 984
    }, {
      "country": "August",
      "value": 711
    }, {
      "country": "Sept",
      "value": 1023
    }, {
      "country": "Oct",
      "value": 580
    }, {
      "country": "Nov",
      "value": 443
    }, {
      "country": "Dec",
      "value": 441
    }];


    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 40;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = "country";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;

    series.columns.template.fillOpacity = 0.75;

    let hoverState = series.columns.template.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.tension = 0.4;

    chart.cursor = new am4charts.XYCursor();

    // Add distinctive colors for each column using adapter
    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    chart.scrollbarX = new am4core.Scrollbar();

    this.chart2 = chart
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (/*isNaN(d[key]) && */d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
}
