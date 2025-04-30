import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../services/models/customer.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  customerId!: string;
  customer: Customer | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.customerId = '1'; // This should be dynamically set based on user input or routing
    this.fetchCustomerInfo();
  }

  fetchCustomerInfo(): void {
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