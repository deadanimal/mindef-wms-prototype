import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

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

@Component({
  selector: 'app-pembaca-meter',
  templateUrl: './pembaca-meter.component.html',
  styleUrls: ['./pembaca-meter.component.scss']
})
export class PembacaMeterComponent implements OnInit, OnDestroy {

  options = {
    layers: [
      tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "...",
      }),
    ],
    zoom: 18,
    center: latLng(3.11369, 101.750527),
  };

  private map;

  private chart0;
  private chart1;

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.getCharts()
  }

  onMapReady(map: L.Map) {
    L.Routing.control({
        waypoints: [
            L.latLng(3.1135, 101.751),
            L.latLng(3.11369, 101.752)
        ],
        routeWhileDragging: true
    }).addTo(map);
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
      this.getChartMonthlyTask()
      this.getChartDailyDist()
    })
  }

  getChartMonthlyTask() {
    let chart = am4core.create("chartMonthlyTask", am4charts.XYChart3D);

    // Add data
    chart.data = [{
      "country": "Jan",
      "visits": 4025
    }, {
      "country": "Feb",
      "visits": 1882
    }, {
      "country": "Mac",
      "visits": 1809
    }, {
      "country": "Apr",
      "visits": 1322
    }, {
      "country": "Mei",
      "visits": 1122
    }, {
      "country": "Jun",
      "visits": 1114
    }, {
      "country": "Jul",
      "visits": 984
    }, {
      "country": "Ogos",
      "visits": 711
    }, {
      "country": "Sept",
      "visits": 665
    }, {
      "country": "Okt",
      "visits": 580
    }, {
      "country": "Nov",
      "visits": 443
    }, {
      "country": "Dis",
      "visits": 441
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.hideOversized = false;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.label.rotation = 270;
    categoryAxis.tooltip.label.horizontalCenter = "right";
    categoryAxis.tooltip.label.verticalCenter = "middle";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Countries";
    valueAxis.title.fontWeight = "bold";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.name = "Visits";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#FFFFFF");

    columnTemplate.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })

    columnTemplate.adapter.add("stroke", function(stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;

    this.chart0 = chart;
  }

  getChartDailyDist() {
    let chart = am4core.create("chartDailyDist", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [{
        "date": "2018-01-01",
        "steps": 4561
    }, {
        "date": "2018-01-02",
        "steps": 5687
    }, {
        "date": "2018-01-03",
        "steps": 6348
    }, {
        "date": "2018-01-04",
        "steps": 4878
    }, {
        "date": "2018-01-05",
        "steps": 9867
    }, {
        "date": "2018-01-06",
        "steps": 7561
    }, {
        "date": "2018-01-07",
        "steps": 1287
    }, {
        "date": "2018-01-08",
        "steps": 3298
    }, {
        "date": "2018-01-09",
        "steps": 5697
    }, {
        "date": "2018-01-10",
        "steps": 4878
    }, {
        "date": "2018-01-11",
        "steps": 8788
    }, {
        "date": "2018-01-12",
        "steps": 9560
    }, {
        "date": "2018-01-13",
        "steps": 11687
    }, {
        "date": "2018-01-14",
        "steps": 5878
    }, {
        "date": "2018-01-15",
        "steps": 9789
    }, {
        "date": "2018-01-16",
        "steps": 3987
    }, {
        "date": "2018-01-17",
        "steps": 5898
    }, {
        "date": "2018-01-18",
        "steps": 9878
    }, {
        "date": "2018-01-19",
        "steps": 13687
    }, {
        "date": "2018-01-20",
        "steps": 6789
    }, {
        "date": "2018-01-21",
        "steps": 4531
    }, {
        "date": "2018-01-22",
        "steps": 5856
    }, {
        "date": "2018-01-23",
        "steps": 5737
    }, {
        "date": "2018-01-24",
        "steps": 9987
    }, {
        "date": "2018-01-25",
        "steps": 16457
    }, {
        "date": "2018-01-26",
        "steps": 7878
    }, {
        "date": "2018-01-27",
        "steps": 6845
    }, {
        "date": "2018-01-28",
        "steps": 4659
    }, {
        "date": "2018-01-29",
        "steps": 7892
    }, {
        "date": "2018-01-30",
        "steps": 7362
    }, {
        "date": "2018-01-31",
        "steps": 3268
    }];

    chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";
    chart.zoomOutButton.disabled = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.strokeOpacity = 0;
    dateAxis.renderer.minGridDistance = 10;
    dateAxis.dateFormats.setKey("day", "d");
    dateAxis.tooltip.hiddenState.properties.opacity = 1;
    dateAxis.tooltip.hiddenState.properties.visible = true;


    dateAxis.tooltip.adapter.add("x", function (x, target) {
        return am4core.utils.spritePointToSvg({ x: chart.plotContainer.pixelX, y: 0 }, chart.plotContainer).x + chart.plotContainer.pixelWidth / 2;
    })

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // goal guides
    let axisRange = valueAxis.axisRanges.create();
    axisRange.value = 6000;
    axisRange.grid.strokeOpacity = 0.1;
    axisRange.label.text = "Goal";
    axisRange.label.align = "right";
    axisRange.label.verticalCenter = "bottom";
    axisRange.label.fillOpacity = 0.8;

    valueAxis.renderer.gridContainer.zIndex = 1;

    let axisRange2 = valueAxis.axisRanges.create();
    axisRange2.value = 12000;
    axisRange2.grid.strokeOpacity = 0.1;
    axisRange2.label.text = "2x goal";
    axisRange2.label.align = "right";
    axisRange2.label.verticalCenter = "bottom";
    axisRange2.label.fillOpacity = 0.8;

    let series = chart.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueY = "steps";
    series.dataFields.dateX = "date";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.hiddenState.properties.opacity = 1;
    series.tooltip.hiddenState.properties.visible = true;
    series.tooltip.adapter.add("x", function (x, target) {
        return am4core.utils.spritePointToSvg({ x: chart.plotContainer.pixelX, y: 0 }, chart.plotContainer).x + chart.plotContainer.pixelWidth / 2;
    })

    let columnTemplate = series.columns.template;
    columnTemplate.width = 30;
    columnTemplate.column.cornerRadiusTopLeft = 20;
    columnTemplate.column.cornerRadiusTopRight = 20;
    columnTemplate.strokeOpacity = 0;

    columnTemplate.adapter.add("fill", function (fill, target) {
        return am4core.color("#a8b3b7");
    })

    let cursor = new am4charts.XYCursor();
    cursor.behavior = "panX";
    chart.cursor = cursor;
    cursor.lineX.disabled = true;

    chart.events.on("datavalidated", function () {
        dateAxis.zoomToDates(new Date(2018, 0, 21), new Date(2018, 1, 1), false, true);
    });

    let middleLine = chart.plotContainer.createChild(am4core.Line);
    middleLine.strokeOpacity = 1;
    middleLine.stroke = am4core.color("#000000");
    middleLine.strokeDasharray = "2,2";
    middleLine.align = "center";
    middleLine.zIndex = 1;
    middleLine.adapter.add("y2", function (y2, target) {
        return target.parent.pixelHeight;
    })

    cursor.events.on("cursorpositionchanged", updateTooltip);
    dateAxis.events.on("datarangechanged", updateTooltip);

    function updateTooltip() {
        dateAxis.showTooltipAtPosition(0.5);
        series.showTooltipAtPosition(0.5, 0);
        series.tooltip.validate(); // otherwise will show other columns values for a second
    }


    let label = chart.plotContainer.createChild(am4core.Label);
    label.x = 90;
    label.y = 50;

    this.chart1 = chart;
  }

}
