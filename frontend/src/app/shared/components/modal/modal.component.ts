import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;" (click)="onBackdropClick()">
      <div class="card" style="min-width: 20rem; max-width: 90vw; padding: 1.5rem;" (click)="$event.stopPropagation()" role="dialog" [attr.aria-label]="title()">
        <h2 style="margin: 0 0 1rem 0;">{{ title() }}</h2>
        <ng-content></ng-content>
        @if (showClose()) {
          <button type="button" class="secondary" style="margin-top: 1rem;" (click)="close.emit()">Close</button>
        }
      </div>
    </div>
  `,
})
export class ModalComponent {
  title = input<string>('');
  showClose = input<boolean>(true);
  close = output<void>();

  onBackdropClick(): void {
    this.close.emit();
  }
}
