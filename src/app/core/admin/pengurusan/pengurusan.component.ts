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
  selector: 'app-pengurusan',
  templateUrl: './pengurusan.component.html',
  styleUrls: ['./pengurusan.component.scss']
})
export class PengurusanComponent implements OnInit {
  
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
      designate: "Daerah Bera",
      status: "1"
    },
    {
      readerName: "Ali2",
      id1: "K102J2KD",
      id2: "K1E2J2KD",
      designate: "Daerah Bera",
      status: "2"
    },
    {
      readerName: "Ali3",
      id1: "K103J2KD",
      id2: "K1E3J2KD",
      designate: "Daerah Bera",
      status: "1"
    },
    {
      readerName: "Ali4",
      id1: "K104J2KD",
      id2: "K1E4J2KD",
      designate: "Daerah Bera",
      status: "1"
    },
    {
      readerName: "Ali5",
      id1: "K105J2KD",
      id2: "K1E5J2KD",
      designate: "Daerah Bera",
      status: "1"
    },
    {
      readerName: "Abu1",
      id1: "K106J2KD",
      id2: "K1E6J2KD",
      designate: "Daerah Bera",
      status: "1"
    },
    {
      readerName: "Abu2",
      id1: "K107J2KD",
      id2: "K1E7J2KD",
      designate: "Daerah Bera",
      status: "1"
    },
    {
      readerName: "Abu3",
      id1: "K108J2KD",
      id2: "K1E8J2KD",
      designate: "Daerah Bera",
      status: "2"
    },
    {
      readerName: "Abu4",
      id1: "K109J2KD",
      id2: "K1E9J2KD",
      designate: "Daerah Bera",
      status: "2"
    },
    {
      readerName: "Abu5",
      id1: "K110J2KD",
      id2: "K1F0J2KD",
      designate: "Daerah Bera",
      status: "1"
    },
    {
      readerName: "Angah",
      id1: "K111J2KD",
      id2: "K1F1J2KD",
      designate: "Daerah Bera",
      status: "2"
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
      this.getChartPayCut()
      this.getChartPayMethod()
    })
  }

  getChartPayCut() {
    let chart = am4core.create("chartPayCut", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "Berjaya",
        litres: 1074
      },
      {
        country: "Gagal",
        litres: 449
      }
    ];

    chart.innerRadius = am4core.percent(40);
    chart.depth = 50;

    chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    this.chart0 = chart;
  }

  getChartPayMethod() {
    let chart = am4core.create("chartPayMethod", am4charts.PieChart);

    // Add data
    chart.data = [{
      "country": "Cash",
      "litres": 501.9
    }, {
      "country": "eWallet",
      "litres": 301.9
    }, {
      "country": "Online Banking",
      "litres": 201.1
    }, {
      "country": "Banking",
      "litres": 165.8
    }];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    let rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

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
