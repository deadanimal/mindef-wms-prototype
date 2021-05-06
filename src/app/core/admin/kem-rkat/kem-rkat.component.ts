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
  selector: 'app-kem-rkat',
  templateUrl: './kem-rkat.component.html',
  styleUrls: ['./kem-rkat.component.scss']
})
export class KemRkatComponent implements OnInit {

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
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    },
    {
      houseNo: "K1E1J2KD",
      id1: "K101J2KD",
      residentName: "Ali1",
      residentNum: "3"
    }
  ]
  SelectionType = SelectionType;

  private chart0;
  private chart1;

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
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartUsePerHouse()
      this.getChartResPerHouse()
    })
  }

  getChartUsePerHouse() {
    let chart = am4core.create("chartUsePerHouse", am4charts.XYChart);

    // Add data
    chart.data = [{
      "country": "Kurang RM50",
      "visits": 2025
    }, {
      "country": "Kurang RM200",
      "visits": 1882
    }, {
      "country": "Lebih RM200",
      "visits": 1809
    }];

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & +true) {
        return dy + 25;
      }
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    this.chart0 = chart;
  }

  getChartResPerHouse() {
    let chart = am4core.create("chartResPerHouse", am4charts.PieChart);

    // Add data
    chart.data = [ {
      "country": "3",
      "litres": 536
    },
    {
      "country": "4",
      "litres": 222
    },
    {
      "country": "5",
      "litres": 102
    }];

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

    this.chart1 = chart;
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
