import { Component, computed, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { ApiService } from '../../services/api.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  imports: [MatFormFieldModule, MatLabel, MatInputModule, FormsModule, MatButtonModule, MatProgressSpinnerModule, NgIf, RouterLink],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent {

  id = input.required<string>();

  apiService = inject(ApiService);
  router = inject(Router);

  name = linkedSignal(() => this.contactResource.value()?.name ?? '');
  email = linkedSignal(() => this.contactResource.value()?.email ?? '');
  phone = linkedSignal(() => this.contactResource.value()?.phone ?? '');

  saving = signal(false);
  loading = computed(() => this.contactResource.isLoading() || this.saving());

  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.apiService.getContact(id)
  });

  async save(){
    this.saving.set(true);

    await this.apiService.updateContact({
      id: this.id(),
      name: this.name(),
      email: this.email(),
      phone: this.phone()
    });

    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
