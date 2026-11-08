import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

type ReportRow = { seat: string; sourceId: string; sourceName: string; environment: string; targeting: string; geo: string; requests: number; opportunities: number };
type ColumnKey = keyof ReportRow;

@Component({
  selector: 'app-dashboard', standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule],
  templateUrl: './dashboard.component.html', styleUrl: './app.component.scss',
})
export class DashboardComponent {
  reportDate = '2026-11-08';
  sourcesOnly = false;
  reportStatus = '';
  readonly navItems = [
    { title: 'Dashboard', icon: 'dashboard' },
    { title: 'Source Management', icon: 'dns' },
    { title: 'Source Statistics', icon: 'bar_chart' },
    { title: 'Settings', icon: 'settings' },
  ];
  readonly columns: { key: ColumnKey; label: string }[] = [
    { key: 'seat', label: 'Seat Name' }, { key: 'sourceId', label: 'Source ID' },
    { key: 'sourceName', label: 'Source Name' }, { key: 'environment', label: 'Environment' },
    { key: 'targeting', label: 'Targeting' }, { key: 'geo', label: 'Geo' },
    { key: 'requests', label: 'Ad Requests' }, { key: 'opportunities', label: 'Ad Opportunities' },
  ];
  readonly displayedColumns = this.columns.map(c => c.key);
  filters: Record<ColumnKey, string> = {
    seat: '', sourceId: '', sourceName: '', environment: '', targeting: '', geo: '', requests: '', opportunities: '',
  };
  readonly rows: ReportRow[] = [
    { seat: 'MM', sourceId: '979935', sourceName: 'CTV - 979935-T...', environment: 'Mobile App', targeting: 'WL', geo: 'US', requests: 105150, opportunities: 0 },
  ];
  filteredRows = [...this.rows];

  applyFilters(): void {
    this.filteredRows = this.rows.filter(row =>
      this.columns.every(({ key }) => String(row[key]).toLowerCase().includes(this.filters[key].trim().toLowerCase())) &&
      (!this.sourcesOnly || !!row.sourceId)
    );
  }
  resetFilters(): void {
    for (const key of this.displayedColumns) this.filters[key] = '';
    this.sourcesOnly = false;
    this.applyFilters();
    this.reportStatus = 'Filters cleared.';
  }
  runReport(): void {
    this.applyFilters();
    this.reportStatus = 'Demo report displayed. Connect your reporting API to load live data.';
  }
  exportCsv(): void {
    const escapeCsv = (value: unknown) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [this.columns.map(c => escapeCsv(c.label)).join(','), ...this.filteredRows.map(row => this.displayedColumns.map(key => escapeCsv(row[key])).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'report.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
