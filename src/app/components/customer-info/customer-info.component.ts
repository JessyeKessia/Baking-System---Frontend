import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../services/models/customer.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class CustomerInfoComponent implements OnInit {
  customerId: string = ''; // ID do cliente fornecido pelo usuário
  customer: Customer | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  fetchCustomerInfo(): void {
    if (this.customerId) {
      console.log('Fetching customer info for ID:', this.customerId);
      this.apiService.getCustomerById(this.customerId).subscribe(
        (data: Customer) => {
          this.customer = data;
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage = 'Customer not found';
          this.customer = null;
        }
      );
    }
  }
}