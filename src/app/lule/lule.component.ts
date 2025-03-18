import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-test',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './lule.component.html',
  styleUrl: './lule.component.css'
})
export class LuleComponent {
  doDec () {
    this.counter -= 1
    this.secondCounter -= 1
    // throw new Error('Method not implemented.')
  }
  doIncr () {
    this.secondCounter += 1
    this.counter += 1
    // throw new Error('Method not implemented.')
  }
  public counter: number
  public secondCounter: number

  public constructor () {
    this.counter = 0
    this.secondCounter = 0
  }
}
