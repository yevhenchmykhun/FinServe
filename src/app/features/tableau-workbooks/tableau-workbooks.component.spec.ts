import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauWorkbooksComponent } from './tableau-workbooks.component';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { TableModule } from 'primeng/table';

describe('TableauWorkbooksComponent', () => {
  let component: TableauWorkbooksComponent;
  let fixture: ComponentFixture<TableauWorkbooksComponent>;

  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TableauWorkbooksComponent
      ],
      imports: [
        TableModule
      ],
      providers: [
        {
          provide: DataService,
          useValue: jasmine.createSpyObj('DataService', ['add'])
        },
        {
          provide: MessageService,
          useValue: jasmine.createSpyObj('MessageService', ['add'])
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['add'])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableauWorkbooksComponent);
    component = fixture.componentInstance;

    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
