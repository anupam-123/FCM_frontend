import { Component, inject, NgZone, OnInit } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { NotificationService } from './notification.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [],
})
export class AppComponent implements OnInit {
  private messaging = inject(Messaging);
  private notificationService = inject(NotificationService);
  private ngZone = inject(NgZone);
  recivedMessage: string = '';

  ngOnInit() {
    this.listenForMessages();
  }

  async requestPermission() {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: environment.vapidKey,
      });
      const notification = JSON.stringify({
        token: token,
        title: 'Hello from Angular',
        body: 'This is a test notification',
      });
      this.ngZone.run(() => {
        this.notificationService.sendNotification(notification).subscribe({
          next: (response) => {
            console.log('Notification sent:', response);
            this.recivedMessage = response;
          },
          error: (error) => {
            console.error('Error sending notification:', error);
          },
          complete: () => {
            console.log('Notification request completed');
          },
        });
      });
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error getting permission:', error);
    }
  }

  private listenForMessages() {
    onMessage(this.messaging, (payload) => {
      this.ngZone.run(() => {
        console.log('Message received:', payload);
        // Display the notification
        const notificationTitle = payload.notification?.title || 'Notification';
        const notificationOptions = {
          body: payload.notification?.body,
          icon: payload.notification?.icon,
        };
        new Notification(notificationTitle, notificationOptions);
      });
    });
  }
}
