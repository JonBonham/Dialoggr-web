import { Component, OnChanges, ViewChild, Input, ElementRef, SimpleChanges } from '@angular/core';
import { scaleTime, ScaleTime, scaleLinear, ScaleLinear } from 'd3-scale';
import { Axis, axisBottom, axisLeft } from 'd3-axis';
import { BaseType, Selection, window } from 'd3-selection';
import { extent, max } from 'd3-array';
import { line, curveNatural, curveCardinal } from 'd3-shape';
import { SvgChart } from 'd3kit';
import { Entry } from '../entry.service';

@Component({
  selector: 'date-line-chart',
  templateUrl: './date-line-chart.component.html',
  styles: [
    `.line {
      fill: none;
      stroke: steelblue;
      stroke-width: 2px;
    }`
  ]
  // styleUrls: ['./date-line-chart.component.css']
})
export class DateLineChartComponent extends SvgChart implements OnChanges {

  @ViewChild('dateLineChart') private chartContainer: ElementRef;
  @Input('data') private dlcdata: Entry[];

  // define private properties
  private xScale: ScaleTime<number, number>;
  private yScale: ScaleLinear<number, number>;
  private xAxis:  Axis<number|Date|{ valueOf(): number; }>;
  private yAxis:  Axis<number|Object>;
  private xAxisG: Selection<BaseType, any, BaseType, any>;
  private yAxisG: Selection<BaseType, any, BaseType, any>;

  constructor(private el: ElementRef) {
    super(el.nativeElement);

    // define private properties
    this.xScale = scaleTime().rangeRound([0, this.getInnerWidth()]);
    this.yScale = scaleLinear().rangeRound([this.getInnerHeight(), 0]);
    this.xAxisG = this.rootG.append('g');
    this.yAxisG = this.rootG.append('g');

    // add basic event listeners
    this.draw = this.draw.bind(this);
    this.on('resize.default', this.draw);
    this.on('data.default', this.draw);

    // setup autoresize
    this.fit(
      {
        mode: 'aspectRatio',
        ratio: 4/3,
        maxWidth: window(el.nativeElement).innerWidth * 0.95,
        maxHeight: window(el.nativeElement).innerWidth * 0.95 * 0.75,
      },
      true
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data(changes['dlcdata'].currentValue);
  }

  // draws a line segment based on our date-line data input
  line = line<Entry>()
    .x((d: Entry): number => this.xScale(d.start))
    .y((d: Entry): number => this.yScale(d.value))
    .curve(curveCardinal);


  draw() {
    // don't do anything if we don't have data
    if (!this.hasData()) { return; }

    // get the data
    const data: Entry[] = this.data();

    // update x and y scales to match the data
    this.xScale.domain(extent(data, (d: Entry): Date => d.start))
        .rangeRound([0, this.getInnerWidth()]);
    this.yScale.domain([0, max(data, (d: Entry) => +d.value)])
    // this.yScale.domain([50, 120])
        .rangeRound([this.getInnerHeight(), 0]);

    // remove old lines
    this.rootG.selectAll('.line').remove();

    // draw our line
    this.rootG.append('path').data([data]).attr('class', 'line').attr('d', this.line);

    // (re)draw the x axis
    this.xAxisG.attr('transform', `translate(0, ${this.getInnerHeight()})`).call(axisBottom(this.xScale));

    // (re)draw the y axis
    this.yAxisG.call(axisLeft(this.yScale));
  }

}
