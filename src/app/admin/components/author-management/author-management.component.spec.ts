import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorManagementComponent } from './author-management.component';

describe('AuthorManagementComponent', () => {
  let component: AuthorManagementComponent;
  let fixture: ComponentFixture<AuthorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
