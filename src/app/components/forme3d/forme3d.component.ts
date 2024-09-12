import { Component, OnInit, Input } from '@angular/core';
import { FormeComponent } from '../forme/forme.component';

@Component({
  selector: 'app-forme3d',
  templateUrl: './forme3d.component.html',
  styleUrls: ['./forme3d.component.css'],
})
export class Forme3DComponent extends FormeComponent implements OnInit {
  @Input() volume: number = 0;

  constructor() {
    super();
  }

  override ngOnInit() {}

  calculerVolume(): void {
    // À implémenter dans les classes dérivées
  }
}
