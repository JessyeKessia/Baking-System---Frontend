import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-customer-registration',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.registrationForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.apiService.registerCustomer(this.registrationForm.value).subscribe(response => {
        // Handle successful registration
        console.log('Customer registered successfully', response);
        this.registrationForm.reset();
      }, error => {
        // Handle registration error
        console.error('Error registering customer', error);
      });
    }
  }
}