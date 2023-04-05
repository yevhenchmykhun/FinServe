import { Component, OnInit, inject } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly dataService = inject(DataService);

  ngOnInit(): void {
    this.dataService.getBusinessDates()
      .subscribe(dates => {
        console.log(dates);
      });
  }

}
