import { Component, OnInit, Input } from '@angular/core';
import { FormeComponent } from '../forme/forme.component';

@Component({
  selector: 'app-forme2d',
  templateUrl: './forme2d.component.html',
  styleUrls: ['./forme2d.component.css'],
})
export class Forme2DComponent extends FormeComponent implements OnInit {
  @Input() perimetre: number = 0;

  constructor() {
    super();
  }

  override ngOnInit() {}

  calculerPerimetre(): void {
    // À implémenter dans les classes dérivées
  }
}
