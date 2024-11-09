import { Component, OnInit, ViewChild, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { RegisterIconService } from "./pages/shared/services/register-icons.service";
import { appIcons } from "./app-icons";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { NotificationService } from "./pages/shared/services/notification-service";
import { tap } from "rxjs";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { LanguageSelectorComponent } from "./utils/language-selector/language-selector.component";
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from "./pages/shared/services/translation-service/translation.service";

interface Tab {
  path: string;
  title: string;
  hidden?: boolean;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterOutlet,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    LanguageSelectorComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [TranslationService],
})
export class AppComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger | undefined;
  @ViewChild("sidenav") sidenav!: MatSidenav;
  isMenuOpen = signal(false);
  isSideNavOpen = false;
  showServiceTabs = false;
  tabs: Tab[] = [
    { path: "home", title: "APP.TABS.HOME" },
    { path: "about", title: "APP.TABS.ABOUT" },
    { path: "services", title: "APP.TABS.SERVICE", hidden: true },
    { path: "contact", title: "APP.TABS.CONTACT" },
  ];
  serviceTabs: Tab[] = [
    {
      path: "consultancy-service",
      title: "APP.SERVICE_TABS.CONSULTANCY_SERVICE",
    },
    { path: "software-service", title: "APP.SERVICE_TABS.SOFTWARE_SERVICE" },
    { path: "cloud-service", title: "APP.SERVICE_TABS.CLOUD_SERVICE" },
    { path: "ai-service", title: "APP.SERVICE_TABS.AI_SERVICE" },
  ];
  constructor(
    private regIcon: RegisterIconService,
    private notification: NotificationService,
    private snackBar: MatSnackBar,
    private ts: TranslationService
  ) {
    this.ts.setDefaultLanguage();
    this.regIcon.registerIcons(appIcons);
  }

  ngOnInit(): void {
    this.showSuccessMessage();
    this.showErrorMessage();
  }

  showSuccessMessage() {
    this.notification.normalMessage$
      .pipe(
        tap((message) =>
          this.snackBar.open(message, "", {
            duration: 5000,
            panelClass: ["success-message"],
          })
        )
      )
      .subscribe();
  }

  showErrorMessage() {
    this.notification.errorMessage$
      .pipe(
        tap((message) =>
          this.snackBar.open(message, "", {
            duration: 5000,
            panelClass: ["error-message"],
          })
        )
      )
      .subscribe();
  }

  isOpened() {
    this.isMenuOpen.set(true);
  }

  isClosed() {
    this.isMenuOpen.set(false);
  }

  openMenu() {
    this.isMenuOpen.set(true);
    this.menuTrigger?.openMenu();
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.menuTrigger?.closeMenu();
  }

  toggleMenu() {
    if (this.sidenav.opened) {
      this.sidenav.close();
      this.isSideNavOpen = false;
    } else {
      this.sidenav.open();
      this.isSideNavOpen = true;
    }
  }

  tabClicked() {
    this.sidenav.close();
    this.isSideNavOpen = false;
  }

  toggleServiceTabs() {
    this.showServiceTabs = !this.showServiceTabs;
  }
}
