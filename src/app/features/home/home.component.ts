import { Component, OnInit, inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly dataService = inject(DataService);

  private readonly authService = inject(AuthService);

  data: any;

  loading: any;

  token = this.authService.token;

  ngOnInit(): void {
    this.dataService.getBusinessDates()
    .pipe(tap(() => this.loading = true))
      .subscribe(dates => {
        this.data = dates;
        this.loading = false
      });
  }

}
