import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { AboutPage } from '../about/about'
import { ContactPage } from '../contact/contact'
import { PopoverController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { CalendarPage } from '../calendar/calendar';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the MainAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-app',
  templateUrl: 'main-app.html'

})
export class MainAppPage {
  YourFancyButton: any;

  myDate = new Date(new Date().getTime() + (3 * 60 * 60 * 1000)).toISOString();
  public base64Image: string;
  imagesCount: number;
  images: string[] = [];
  firstName: string;
  lastName: string;
  startTime=0;
  date :Date ;
  d:number;
  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    private screenOrientation: ScreenOrientation,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private camera: Camera,
    private storage: Storage,
    private http: HTTP,) {
    this.imagesCount = 0;
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.date=new Date();
    storage.get('firstName').then((val) => {
      this.firstName = val;
    });
    storage.get('lastName').then((val) => {
      this.lastName = val;
    });
    this.http.get(this.meetURL, {}, {})
    .then(data => {
      var ob = JSON.parse(data.data);
      var dataList=ob.dataList;
      console.log(data.data);
      this.startTime=dataList.startTime;
      this.d =new Date(this.date.getTime()-this.startTime).getTime();
    })
    .catch(error => {
    });
  }
  hour = 0;
  minute = 0;
  second = 0;
  tempTime;
  temp = true;
  temp1 = false;
  show = false;
  start = false;
  txt = "Start";
  volunteerName = "";
  volunteerNum = "";
  idNum = "";
  intrevalId: number;
  startURL:string="http://adoptsaba.com/volunteer/startMeet";
  stopURL:string="http://adoptsaba.com/volunteer/endMeet";
  questionsURL:string="http://adoptsaba.com/volunteer/getQuestions";
  meetURL:string="http://adoptsaba.com/volunteer/OpenedMeet";
  /********************************************************************************************************************************************** */
  pushImage(name: string) {
    this.images[this.imagesCount] = name;
    this.imagesCount++;
  }
  /********************************************************************************************************************************************** */

  intrevalDate = setInterval(() => {
    this.myDate = new Date(new Date().getTime() + (3 * 60 * 60 * 1000)).toISOString();
  }, 1000)

  /********************************************************************************************************************************************** */

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainAppPage');
  }
  /********************************************************************************************************************************************** */

  takePic() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.pushImage(this.base64Image);
    }, (err) => {
      console.log(err);
    });
  }
  /********************************************************************************************************************************************** */
  /*timerFunc() {
    this.start = true;
    this.temp1 = true;
    if (this.temp == true) {
      this.temp = false;
      clearInterval(this.intrevalId);
      this.hourR = 0;
      this.minuteR = 0;
      this.secondR = 0;
      this.hourL = 0;
      this.minuteL = 0;
      this.secondL = 0;
      this.txt = "started";
      this.intrevalId = setInterval(() => {
        this.secondR++;
        if (this.secondR == 10) {
          this.secondR = 0;
          this.secondL++;
        }
        if (this.secondL == 6) {
          this.secondR = 0;
          this.secondL = 0;
          this.minuteR++;
        }
        if (this.minuteR == 10) {
          this.secondR = 0;
          this.secondL = 0;
          this.minuteR = 0;
          this.minuteL++;
        }
        if (this.minuteL == 6) {
          this.secondR = 0;
          this.secondL = 0;
          this.minuteR = 0;
          this.minuteL = 0;
          this.hourR++;
        }
        if (this.hourR == 10) {
          this.secondR = 0;
          this.secondL = 0;
          this.minuteR = 0;
          this.minuteL = 0;
          this.hourR = 0;
          this.hourL++;
        }
        if (this.hourL == 2 && this.hourR == 4) {
          this.secondR = 0;
          this.secondL = 0;
          this.minuteR = 0;
          this.minuteL = 0;
          this.hourR = 0;
          this.hourL = 0;
          this.secondR++;
        }
      }, 1000);
    }
  }*/
  timerFunc() {
    this.http.get(this.startURL, {}, {})
      .then(data => {
       
      })
      .catch(error => {
      });
      this.start = true;
      this.temp1 = true;
      if (this.temp == true) {
        this.temp = false;
        clearInterval(this.intrevalId);
        let options={
          hour:'2-digit',
          minute:'2-digit',
          second:'2-digit',
          timeZone:'UTC'
        }
        this.tempTime= new Date(this.d).toLocaleString('en-GB',options);
        this.txt = "started";
        this.intrevalId = setInterval(() => {
          this.d+=1000;
          this.tempTime= new Date(this.d).toLocaleString('en-GB',options);
        }, 1000);
      }
  }
  stop() {
    this.http.get(this.stopURL, {
    }, {})
      .then(data => {
       
      })
      .catch(error => {
      }); 
      this.start = false;
      this.temp = true;
      this.temp1 = false;
      clearInterval(this.intrevalId);
      this.intrevalId = -1;
      if(this.txt!="Start"){
      
      
      } else {
      let alert = this.alertCtrl.create({
        title: '!!!תתחיל הטיימר קודם',
        buttons: [
          {
            text: 'submit',
          }
        ]
      });
      alert.present();
    }
    this.txt = "Start";
  }
  /********************************************************************************************************************************************** */
 /* stop() {
    this.start = false;
    this.temp = true;
    this.temp1 = false;
    clearInterval(this.intrevalId);
    this.txt = "Start";
    this.intrevalId = -1;
    if (this.minuteR * 10 + this.secondR != 0) {
      let alert = this.alertCtrl.create({
        title: 'דוח ',
        subTitle: 'אנא ציין/י את אופי המפגשים (ניתן ורצוי לבחור יותר מאחת) *',
        inputs: [
          {
            type: 'checkbox',
            label: 'משחקי חברה',

          },
          {
            type: 'checkbox',
            label: 'שיחות אקטואליה',
          }
          ,
          {
            type: 'checkbox',
            label: 'שימוש במחשב',
          },
          {
            type: 'checkbox',
            label: 'פעילות מחוץ לבית הקשיש',
          },
          {
            type: 'checkbox',
            label: 'בישול',
          },
          {
            type: 'checkbox',
            label: 'מוזיקה',
          },
          {
            type: 'checkbox',
            label: 'other',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'submit',
            handler: data => {
              let alert = this.alertCtrl.create({
                title: 'האם היו אירועים חריגים הדורשים התערבות גורם מוסמך?/ אירועים חיוביים שתרצה לחלוק איתנו?',
                inputs: [
                  {
                    name: 'text',
                    placeholder: 'enter your text'
                  }
                ],
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'submit',
                    handler: data => {
                      //sent data to the website
                    }
                  }
                ]
              });
              alert.present();
            }

          }

        ]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '!!!תתחיל הטיימר קודם',
        buttons: [
          {
            text: 'submit',
          }
        ]
      });
      alert.present();
    }
    // this.hourL = 0;
    // this.minuteL = 0;
    // this.secondL = 0;
    // this.hourR = 0;
    // this.minuteR = 0;
    // this.secondR = 0;
  }*/
  /********************************************************************************************************************************************** */

  call() {
    setTimeout(() => {
      let tel = "0502145087";
      window.open(`tel:${tel}`, '_system');
    }, 100);
  }
  /**********************************************************************************************************************************************/
  menu() {

    this.menuCtrl.open();
  }
  /**********************************************************************************************************************************************/
  signout() {
    let alert = this.alertCtrl.create({
      title: 'Confirm sign out',
      message: 'Do you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'confirm',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }
  /**********************************************************************************************************************************************/
  home() {
    this.navCtrl.setRoot(HomePage);
  }
  /**********************************************************************************************************************************************/
  about() {
    this.navCtrl.setRoot(AboutPage);
  }
  /**********************************************************************************************************************************************/
  contact() {
    this.navCtrl.setRoot(ContactPage);
  }
  /**********************************************************************************************************************************************/
  showProfile(myEvent) {
    let popover = this.popoverCtrl.create(ProfilePage);
    popover.present({
      ev: myEvent
    });
  }

  notify(myEvent) {
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
  calender(myEvent) {
    let popover = this.popoverCtrl.create(CalendarPage);
    popover.present({
      ev: myEvent
    });
  }
}
