import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackDialogComponent } from './attack-dialog.component';

describe('AttackDialogComponent', () => {
  let component: AttackDialogComponent;
  let fixture: ComponentFixture<AttackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttackDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
