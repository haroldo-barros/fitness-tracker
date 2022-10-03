import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubsciption: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubsciption = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubsciption.unsubscribe();
  }

}
