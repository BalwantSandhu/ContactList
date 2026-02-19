import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatLabel } from '@angular/material/form-field';
import { Router, RouterLink } from "@angular/router";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  imports: [MatFormFieldModule, MatButtonModule, MatLabel, RouterLink, MatInputModule, FormsModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  apiService = inject(ApiService);
  router = inject(Router);
  
  name = signal('');
  email = signal('');
  phone = signal('');

  saving = signal(false);

  async save(){
    this.saving.set(true);
    await this.apiService.addContact({
      id:'',
      name: this.name(),
      email: this.email(),
      phone: this.phone()
    });
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
