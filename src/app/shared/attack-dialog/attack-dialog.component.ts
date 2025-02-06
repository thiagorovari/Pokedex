import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-attack-dialog',
  standalone: false,
  
  templateUrl: './attack-dialog.component.html',
  styleUrl: './attack-dialog.component.scss'
})
export class AttackDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AttackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { moveName: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
