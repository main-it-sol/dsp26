import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-placeholder', standalone: true,
  template: `<h1 class="page-heading">{{ title }}</h1><section class="page-panel">Replace this placeholder with your {{ title }} component.</section>`,
  styles: [`.page-heading{font-size:23px;font-weight:500;margin:0 0 16px}.page-panel{background:white;border:1px solid #dce0e8;border-radius:6px;padding:22px}`],
})
export class PlaceholderComponent {
  readonly title = inject(ActivatedRoute).snapshot.data['title'] as string;
}
