import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private readonly dataService = inject(DataService);

  private readonly authService = inject(AuthService);

  ngOnInit(): void {

  }

}
