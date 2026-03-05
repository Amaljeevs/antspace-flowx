import { Component } from '@angular/core';

@Component({
  selector: 'app-plans',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-semibold">Plans & Pricing</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Special welcome offer: get 2 free paper trades daily with any paid plan.
        </p>
      </div>

      <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
        <article class="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 p-5 shadow-sm">
          <p class="text-sm text-slate-500 dark:text-slate-400">Free</p>
          <p class="text-3xl font-bold mt-1">₹0</p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Validity: 30 Days</p>
          <ul class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>✓ Paper Trading</li>
            <li>✓ Basic Analytics</li>
            <li>✓ 30 runs/day</li>
          </ul>
          <button type="button" class="mt-5 w-full rounded-full bg-slate-200 dark:bg-slate-700 py-2.5 text-sm font-semibold">
            Current Plan
          </button>
        </article>

        <article class="rounded-2xl border border-indigo-300 bg-white dark:border-indigo-500/50 dark:bg-slate-900 p-5 shadow-sm">
          <p class="text-sm text-slate-500 dark:text-slate-400">3 Months</p>
          <p class="text-3xl font-bold mt-1">₹3999</p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Validity: 3 Months</p>
          <ul class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>✓ Paper Trading</li>
            <li>✓ Live Trading</li>
            <li>✓ Custom + Pre-built Strategies</li>
            <li>✓ Multiple Trading Accounts</li>
            <li>✓ 30 runs/day</li>
          </ul>
          <button type="button" class="mt-5 w-full rounded-full bg-[#0A1A5F] text-white py-2.5 text-sm font-semibold">
            Subscribe
          </button>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 p-5 shadow-sm">
          <p class="text-sm text-slate-500 dark:text-slate-400">1 Month</p>
          <p class="text-3xl font-bold mt-1">₹1500</p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Validity: 1 Month</p>
          <ul class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>✓ Paper Trading</li>
            <li>✓ Live Trading</li>
            <li>✓ Custom + Pre-built Strategies</li>
            <li>✓ Multiple Trading Accounts</li>
            <li>✓ 30 runs/day</li>
          </ul>
          <button type="button" class="mt-5 w-full rounded-full bg-[#0A1A5F] text-white py-2.5 text-sm font-semibold">
            Subscribe
          </button>
        </article>
      </div>

      <section class="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 overflow-hidden">
        <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <h2 class="font-semibold">Features Comparison</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm min-w-[720px]">
            <thead class="bg-indigo-100/70 dark:bg-indigo-900/30">
              <tr>
                <th class="text-left px-4 py-3">Features</th>
                <th class="text-left px-4 py-3">Free</th>
                <th class="text-left px-4 py-3">3 Months</th>
                <th class="text-left px-4 py-3">1 Month</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-slate-200 dark:border-slate-700">
                <td class="px-4 py-3">Price</td>
                <td class="px-4 py-3">₹0</td>
                <td class="px-4 py-3">₹3999</td>
                <td class="px-4 py-3">₹1500</td>
              </tr>
              <tr class="border-t border-slate-200 dark:border-slate-700">
                <td class="px-4 py-3">Validity</td>
                <td class="px-4 py-3">30 Days</td>
                <td class="px-4 py-3">3 Months</td>
                <td class="px-4 py-3">1 Month</td>
              </tr>
              <tr class="border-t border-slate-200 dark:border-slate-700">
                <td class="px-4 py-3">Paper Trade</td>
                <td class="px-4 py-3">✓</td>
                <td class="px-4 py-3">✓</td>
                <td class="px-4 py-3">✓</td>
              </tr>
              <tr class="border-t border-slate-200 dark:border-slate-700">
                <td class="px-4 py-3">Live Broker Trade</td>
                <td class="px-4 py-3">—</td>
                <td class="px-4 py-3">✓</td>
                <td class="px-4 py-3">✓</td>
              </tr>
              <tr class="border-t border-slate-200 dark:border-slate-700">
                <td class="px-4 py-3">Max Runs</td>
                <td class="px-4 py-3">30 / Day</td>
                <td class="px-4 py-3">30 / Day</td>
                <td class="px-4 py-3">30 / Day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
})
export class PlansComponent {}
