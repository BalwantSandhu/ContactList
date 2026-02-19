import { Component, computed, inject, resource, signal } from '@angular/core';
import { Contact } from '../../model/contact';
import { NgForOf, NgIf } from "@angular/common";
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-contact-list',
  imports: [NgForOf, NgIf, MatListModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  // contacts = signal<Contact[]>([
  //   {
  //     id: '1',
  //     name: 'Kohli',
  //     phone: '123-123-1234',
  //     email: 'kohli@gmail.com'
  //   },
  //   {
  //     id: '2',
  //     name: 'Virat',
  //     phone: '223-123-1234',
  //     email: 'virat@gmail.com'
  //   }
  // ]);

  apiService = inject(ApiService);

  deleting = signal(false);

  loading = computed(() => this.contactResource.isLoading() || this.deleting());

  contactResource = resource({
    loader: () => this.apiService.getContacts()
  });

  async deleteContact(contactId: string){
    this.deleting.set(true);
    await this.apiService.deleteContact(contactId);
    this.deleting.set(false);
    this.contactResource.reload();
  }
}
