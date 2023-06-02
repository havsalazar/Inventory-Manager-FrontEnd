import { LocalService } from './../../Services/localStorage.service';
import { AuthService } from './../../Interceptors/auth.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from './../services/layout.service';
import { map, takeUntil, timeout } from 'rxjs/operators';
import { Subject, take } from 'rxjs';
import { Router } from '@angular/router';
import { L10N_CONFIG, L10N_LOCALE, L10nConfig, L10nLocale, L10nTranslationService } from 'angular-l10n';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  schema = this.config.schema;
  currentTheme = 'default'; 
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  public selectedLocale:any
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private localService:LocalService,
    private router: Router,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(L10N_CONFIG) private config: L10nConfig,
    private authService:AuthService,
    private translation: L10nTranslationService,
    private breakpointService: NbMediaBreakpointsService) {
      
  }

  ngOnInit() { 
    this.checkLanguage()
    this.currentTheme = this.themeService.currentTheme;
    // this.selectedLocale=this.config.defaultLocale
    this.user = { name: 'Nick Jones', picture: 'assets/images/nick.png' }
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  checkLanguage(){
    // this.selectedLocale=this.config.defaultLocale
    const storedLanguage =this.localService.getData("locale")
    // if(!storedLanguage) this.localService.saveData("locale",JSON.stringify(this.config.defaultLocale))
    if(!storedLanguage) this.saveLocale(this.config.defaultLocale,true)
    else this.setLocale(JSON.parse(storedLanguage))    
  }
  saveLocale(locale:L10nLocale,init=false){
    this.localService.saveData("locale",JSON.stringify(locale))

    if (init) this.setLocale(locale)

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  logOut() {
    this.authService.logOut().subscribe(logOut =>{
      this.router.navigate(['logout']);
    });    
  }
  setLocale(locale: L10nLocale): void { 
    this.selectedLocale=locale; 
    this.saveLocale(locale)
    this.translation.setLocale(locale);

  }
  reloadToken(){
    this.authService.refreshToken().pipe(take(1)).subscribe(token => {console.log(token);}) 
  }
}
