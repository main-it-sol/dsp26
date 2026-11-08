import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-shell', standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatToolbarModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.component.html', styleUrl: './app.component.scss',
})
export class ShellComponent implements OnDestroy {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly breakpointSub: Subscription;
  isMobile = false;
  sidebarCollapsed = false;
  mobileMenuOpen = false;
  readonly navItems = [
    { title: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { title: 'Source Management', icon: 'dns', path: '/sources' },
    { title: 'Source Statistics', icon: 'bar_chart', path: '/statistics' },
    { title: 'Settings', icon: 'settings', path: '/settings' },
  ];
  constructor() {
    this.breakpointSub = this.breakpointObserver.observe('(max-width: 700px)').subscribe(({ matches }) => {
      this.isMobile = matches;
      this.mobileMenuOpen = false;
    });
  }
  ngOnDestroy(): void { this.breakpointSub.unsubscribe(); }
  toggleSidebar(): void {
    if (this.isMobile) this.mobileMenuOpen = !this.mobileMenuOpen;
    else this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  onNavigate(): void { if (this.isMobile) this.mobileMenuOpen = false; }
  logout(): void {
    this.auth.logout();
    this.mobileMenuOpen = false;
    void this.router.navigateByUrl('/login');
  }
}
