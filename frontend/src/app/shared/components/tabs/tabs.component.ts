import { Component, input, output } from '@angular/core';

export interface TabOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  template: `
    <div style="display: flex; gap: 0.25rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem;">
      @for (tab of tabs(); track tab.value) {
        <button
          type="button"
          [class.primary]="activeTab() === tab.value"
          [class.secondary]="activeTab() !== tab.value"
          (click)="tabChange.emit(tab.value)"
        >
          {{ tab.label }}
        </button>
      }
    </div>
    <ng-content></ng-content>
  `,
})
export class TabsComponent {
  tabs = input.required<TabOption[]>();
  activeTab = input.required<string>();
  tabChange = output<string>();
}
