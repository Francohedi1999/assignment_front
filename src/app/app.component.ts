import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {Title} from "@angular/platform-browser";
import { NavbarComponent } from './navbar/navbar/navbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet ,
    NavbarComponent ,
  ],
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit
{
  title = 'Assignment';

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit(): void
  {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.updatePageTitle();
    });
  }

  private updatePageTitle(): void
  {
    const pageTitle = this.getPageTitle( this.router.routerState, this.router.routerState.root );
    this.titleService.setTitle(pageTitle);
  }

  private getPageTitle(state: any, parent: any): string
  {
    const data = parent && parent.snapshot.data;
    if (data && data.title) {
      return data.title;
    }

    // Valeur par défaut retourné lorsque la fonction ne trouve pas de titre pour la page.
    return state && parent ? this.getPageTitle(state, state.firstChild(parent)) : 'Assignment Projet Hedi Franco et Angelo Rakotobe';
  }
}
