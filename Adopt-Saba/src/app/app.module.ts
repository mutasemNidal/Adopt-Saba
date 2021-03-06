import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { MainAppPage } from '../pages/main-app/main-app';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { CallNumber } from '@ionic-native/call-number';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MainAppPageModule } from '../pages/main-app/main-app.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { QuestionBoxPage } from '../pages/question-box/question-box';
import { QuestionBoxPageModule } from '../pages/question-box/question-box.module';
import { HttpModule } from '@angular/http';
import { CalendarPageModule } from '../pages/calendar/calendar.module';
import { CalendarPage } from '../pages/calendar/calendar';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage'
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SignInPage,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MainAppPageModule,
    SignUpPageModule,
    NotificationsPageModule,
    QuestionBoxPageModule,
    CalendarPageModule,
    ProfilePageModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      menuType: 'overlay',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SignInPage,
    SignUpPage,
    MainAppPage,
    NotificationsPage,
    CalendarPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera, CameraPreview, CallNumber, ScreenOrientation, HTTP,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
