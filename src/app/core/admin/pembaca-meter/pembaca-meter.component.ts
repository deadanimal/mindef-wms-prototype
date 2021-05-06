import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { tileLayer, latLng} from "leaflet";
import "leaflet-routing-machine";
import * as L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";

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
  selector: 'app-pembaca-meter',
  templateUrl: './pembaca-meter.component.html',
  styleUrls: ['./pembaca-meter.component.scss']
})
export class PembacaMeterComponent implements OnInit {

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
      readerName: "Ali1",
      id1: "K101J2KD",
      id2: "K1E1J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Ali2",
      id1: "K102J2KD",
      id2: "K1E2J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Ali3",
      id1: "K103J2KD",
      id2: "K1E3J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Ali4",
      id1: "K104J2KD",
      id2: "K1E4J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Ali5",
      id1: "K105J2KD",
      id2: "K1E5J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Abu1",
      id1: "K106J2KD",
      id2: "K1E6J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Abu2",
      id1: "K107J2KD",
      id2: "K1E7J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Abu3",
      id1: "K108J2KD",
      id2: "K1E8J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Abu4",
      id1: "K109J2KD",
      id2: "K1E9J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Abu5",
      id1: "K110J2KD",
      id2: "K1F0J2KD",
      designate: "Daerah Bera"
    },
    {
      readerName: "Angah",
      id1: "K111J2KD",
      id2: "K1F1J2KD",
      designate: "Daerah Bera"
    }
  ]
  SelectionType = SelectionType;

  tEntries: number = 5;
  tSelected: any[] = [];
  tTemp = [];
  tActiveRow: any;
  tRows: any = [
    {
      routeName: "Eagle4",
      designate: "24",
      readerName: "Abu6"
    },
    {
      routeName: "Eagle5",
      designate: "24",
      readerName: "Abu1"
    },
    {
      routeName: "Turtle7",
      designate: "24",
      readerName: "Ali5"
    },
    {
      routeName: "Lion7",
      designate: "24",
      readerName: "Ali6"
    },
    {
      routeName: "Phoenix1",
      designate: "24",
      readerName: "Ali7"
    },
    {
      routeName: "Lion3",
      designate: "24",
      readerName: "Ali8"
    },
    {
      routeName: "Tiger7",
      designate: "24",
      readerName: "Ali9"
    },
    {
      routeName: "Dragon1",
      designate: "24",
      readerName: "Ali0"
    },
    {
      routeName: "Phoenix8",
      designate: "24",
      readerName: "Ali1"
    },
    {
      routeName: "Eagle5",
      designate: "24",
      readerName: "Ali3"
    },
    {
      routeName: "Turtle9",
      designate: "24",
      readerName: "Ali2"
    },
    {
      routeName: "Tiger1",
      designate: "24",
      readerName: "Ali4"
    }
  ]
  tSelectionType = SelectionType;

  options;

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
    this.tTemp = this.tRows.map((prop, key) => {
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
      this.getChartRouteComp()
      this.getChartRouteLength()
    })
  }

  getChartRouteComp() {
    let chart = am4core.create("chartRouteComp", am4charts.PieChart);

    // Add data
    chart.data = [ {
      "country": "Selesai",
      "litres": 536
    },
    {
      "country": "Gagal",
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
    
    this.chart0 = chart;
  }

  getChartRouteLength() {
    let chart = am4core.create("chartRouteLength", am4charts.XYChart);

    // Add data
    chart.data = [{
      "country": "Pendek",
      "visits": 2025
    }, {
      "country": "Sederhana",
      "visits": 1882
    }, {
      "country": "Panjang",
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

  ontActivate(event) {
    this.tActiveRow = event.row;
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  entriesChange1($event) {
    this.tEntries = $event.target.value;
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

  filterTable1($event) {
    let val = $event.target.value;
    this.tTemp = this.tRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  openModal0(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);

    this.options = {
      layers: [
        tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "...",
        }),
      ],
      zoom: 12,
      center: latLng(3.140853, 101.693207),
    };
    
  }

  onMapReady(map: L.Map) {
    L.Routing.control({
        waypoints: [
            L.latLng(3.140853, 101.693207),
            L.latLng(3.11369, 101.750527)
        ],
        routeWhileDragging: true,
    }).addTo(map);
  }

}
