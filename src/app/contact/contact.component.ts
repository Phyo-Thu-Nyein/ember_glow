import { Component } from '@angular/core';
import { MailService } from '../services/mail.service';
import { NgForm } from '@angular/forms';
import { env } from 'src/env/env';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(
    private mailService: MailService
  ) { }

  private color: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  onSubmit: boolean = false;
  contactFormValues = {
    name: '',
    email: '',
    body: '',
  };

  get alertColor() {
    return `text-${this.color}-400`;
  }

  hideAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  async submitEmail(contactForm: NgForm) {
    this.onSubmit = true;
    // set formData values
    let formData: FormData = new FormData();
    formData.append('name', this.contactFormValues.name);
    formData.append('email', this.contactFormValues.email);
    formData.append('body', this.contactFormValues.body);
    // email customization
    formData.append('access_key', env.form_access_key);
    formData.append('subject', 'General Inquiry From My Site');
    formData.append('from_name', 'Contact Notification');

    try {
      // send email
      const res = await this.mailService.sendEmail(formData);
      if (!res.ok) {
        throw new Error();
      }
      this.alertMessage = 'Email sent successfully!'
      this.color = 'green';
      contactForm.reset();
    } catch (err) {
      // handle error
      this.alertMessage = 'Something went wrong, try again later!';
      this.color = 'red';
    }
    // reset submit & hide alert
    this.onSubmit = false;
    this.showAlert = true;
    this.hideAlert();
  }

}
