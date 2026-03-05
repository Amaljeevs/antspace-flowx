import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-broker',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-5">
      <div>
        <h1 class="text-3xl font-semibold">Connect Broker</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Link trading accounts and control execution channels</p>
      </div>
      <h2 class="text-xl font-medium">Brokers List</h2>

      <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        @for (b of brokers; track b.id) {
          <article class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-4">
            <div class="flex items-start justify-between gap-2 mb-3">
              <div class="flex items-start gap-2">
                <img [src]="b.logoUrl" [alt]="b.name + ' logo'" class="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white object-contain p-1" />
                <div>
                <p class="font-semibold">{{ b.name }}</p>
                @if (b.recommended) {
                  <span class="text-xs text-emerald-600">Recommended</span>
                }
                </div>
              </div>
            </div>
            <button type="button" class="inline-flex items-center justify-center rounded-xl bg-[#0A1A5F] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#08144B] rounded-full px-5 py-2" (click)="openSetup(b.id)">
              Setup
            </button>
          </article>
        }
      </div>

      @if (activeBroker) {
        <div class="fixed inset-0 z-40 bg-black/35 grid place-items-center p-4" (click)="closeSetup()">
          <div class="w-full max-w-md rounded-2xl border border-slate-200 dark:border-[#374151] bg-white dark:bg-[#111827] shadow-xl p-5" (click)="$event.stopPropagation()">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">{{ activeBroker.name }}</h3>
              <button type="button" (click)="closeSetup()">✕</button>
            </div>

            <div class="space-y-3">
              <label class="block text-xs text-slate-500">Client ID*
                <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="setup.clientId" />
              </label>

              @if (needsRedirect(activeBroker)) {
                <label class="block text-xs text-slate-500">Redirect URL
                  <div class="mt-1 flex gap-2">
                    <input class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2 bg-indigo-50 dark:bg-slate-800" [value]="setup.redirectUrl" readonly />
                    <button type="button" class="rounded-lg border border-slate-300 dark:border-[#374151] px-3 text-xs" (click)="copyRedirectUrl()">Copy</button>
                  </div>
                </label>
              }

              @if (needsApiKey(activeBroker)) {
                <label class="block text-xs text-slate-500">API Key
                  <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="setup.apiKey" />
                </label>
              }

              @if (needsApiSecret(activeBroker)) {
                <label class="block text-xs text-slate-500">API Secret
                  <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="setup.apiSecret" />
                </label>
              }
            </div>

            <div class="mt-5 flex gap-3">
              <button type="button" class="flex-1 rounded-full bg-indigo-100 dark:bg-slate-700 px-4 py-2 font-semibold" (click)="closeSetup()">Cancel</button>
              <button type="button" class="flex-1 rounded-full bg-[#0A1A5F] text-white px-4 py-2 font-semibold" (click)="connectBroker()">Connect</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class BrokerComponent {
  brokers = [
    { id: 'aliceblue', name: 'Aliceblue', flow: 'full', logoUrl: 'https://www.google.com/s2/favicons?domain=aliceblueonline.com&sz=64' },
    { id: 'iifl', name: 'IIFL Securities', flow: 'clientOnly', logoUrl: 'https://www.google.com/s2/favicons?domain=iiflsecurities.com&sz=64' },
    { id: 'firstock', name: 'Firstock', flow: 'clientOnly', logoUrl: 'https://www.google.com/s2/favicons?domain=firstock.in&sz=64' },
    { id: 'upstox', name: 'Upstox', flow: 'full', logoUrl: 'https://www.google.com/s2/favicons?domain=upstox.com&sz=64' },
    { id: 'zerodha', name: 'Zerodha', flow: 'full', recommended: true, logoUrl: 'https://www.google.com/s2/favicons?domain=zerodha.com&sz=64' },
    { id: 'fyers', name: 'Fyers', flow: 'full', logoUrl: 'https://www.google.com/s2/favicons?domain=fyers.in&sz=64' },
    { id: 'angelone', name: 'Angelone', flow: 'full', logoUrl: 'https://www.google.com/s2/favicons?domain=angelone.in&sz=64' },
    { id: 'finvasia', name: 'Finvasia', flow: 'clientOnly', logoUrl: 'https://www.google.com/s2/favicons?domain=finvasia.com&sz=64' },
    { id: 'dhan', name: 'Dhan', flow: 'full', recommended: true, logoUrl: 'https://www.google.com/s2/favicons?domain=dhan.co&sz=64' },
    { id: 'tradejini', name: 'Tradejini', flow: 'clientOnly', logoUrl: 'https://www.google.com/s2/favicons?domain=tradejini.com&sz=64' },
    { id: 'kotak', name: 'KotakNeo', flow: 'clientOnly', logoUrl: 'https://www.google.com/s2/favicons?domain=kotaksecurities.com&sz=64' },
    { id: 'iifl-capitals', name: 'IIFL Capitals', flow: 'clientOnly', logoUrl: 'https://www.google.com/s2/favicons?domain=iiflcapital.com&sz=64' },
  ];
  activeBroker: { id: string; name: string; recommended?: boolean; flow: string; logoUrl: string } | null = null;
  setup = {
    clientId: '',
    redirectUrl: 'https://app.thealgodesk.com/broker/redirect',
    apiKey: '',
    apiSecret: '',
  };

  openSetup(id: string): void {
    this.activeBroker = this.brokers.find((b) => b.id === id) || null;
  }

  closeSetup(): void {
    this.activeBroker = null;
    this.setup.clientId = '';
    this.setup.apiKey = '';
    this.setup.apiSecret = '';
  }

  needsApiKey(b: { flow: string }): boolean {
    return b.flow === 'full';
  }

  needsApiSecret(b: { flow: string }): boolean {
    return b.flow === 'full';
  }

  needsRedirect(b: { flow: string }): boolean {
    return b.flow === 'full';
  }

  copyRedirectUrl(): void {
    navigator.clipboard.writeText(this.setup.redirectUrl).catch(() => {});
  }

  connectBroker(): void {
    this.closeSetup();
  }
}
