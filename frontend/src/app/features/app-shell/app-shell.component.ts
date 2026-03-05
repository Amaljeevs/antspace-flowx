import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 dark:from-[#0b1220] dark:via-[#111827] dark:to-[#0b1020] text-slate-900 dark:text-slate-100">
      <app-sidebar />
      <div class="ml-20 min-h-screen flex flex-col">
        <app-topbar />
        <main class="flex-1 p-4 md:p-6">
          <div class="mx-auto max-w-[1500px]">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class AppShellComponent {}
