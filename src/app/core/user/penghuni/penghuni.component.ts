import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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
  selector: 'app-penghuni',
  templateUrl: './penghuni.component.html',
  styleUrls: ['./penghuni.component.scss']
})
export class PenghuniComponent implements OnInit {

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
      bilName: "Mac21",
      date: "1/4/2021",
      status: "1"
    },
    {
      bilName: "Feb21",
      date: "2/3/2021",
      status: "2"
    },
    {
      bilName: "Jan21",
      date: "1/2/2021",
      status: "2"
    },
    {
      bilName: "Dis20",
      date: "5/1/2021",
      status: "2"
    },
    {
      bilName: "Nov20",
      date: "30/11/2020",
      status: "2"
    },
    {
      bilName: "Okt20",
      date: "1/11/2020",
      status: "2"
    },
    {
      bilName: "Sept20",
      date: "6/10/2020",
      status: "2"
    },
    {
      bilName: "Ogos20",
      date: "3/9/2020",
      status: "2"
    },
    {
      bilName: "Jul20",
      date: "1/8/2020",
      status: "2"
    },
    {
      bilName: "Jun20",
      date: "2/7/2020",
      status: "2"
    },
    {
      bilName: "Mei20",
      date: "1/6/2020",
      status: "2"
    },
    {
      bilName: "Apr20",
      date: "1/5/2020",
      status: "2"
    }
  ]
  SelectionType = SelectionType;

  private chart0;

  constructor(
    private modalService: BsModalService,
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
    this.zone.runOutsideAngular(
      () => {
        if (this.chart0) {
          console.log('Chart disposed')
          this.chart0.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartMonthlyUse()
    })
  }

  getChartMonthlyUse() {
    let chart = am4core.create("chartMonthlyUse", am4charts.XYChart);
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

    this.chart0 = chart;
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
