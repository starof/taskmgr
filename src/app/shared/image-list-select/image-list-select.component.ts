import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss']
})
export class ImageListSelectComponent implements OnInit {
  @Input() title = "选择"
  @Input() cols = 6;
  @Input() rowHight = '64px'
  @Input() items: string[] = [];
  @Input() useSvgIcon: boolean = false;
  @Input() itemWidth = '80px';
  selected: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onChange(i: number) {
    this.selected = this.items[i];
  }

}
