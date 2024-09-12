import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forme',
  templateUrl: './forme.component.html',
  styleUrls: ['./forme.component.css'],
})
export class FormeComponent implements OnInit {
  @Input() nom: string = '';
  @Input() couleur: string = '';
  @Input() surface: number = 0;

  constructor() {}

  ngOnInit() {}

  calculerSurface(): void {
    // À implémenter dans les classes dérivées
  }
}
