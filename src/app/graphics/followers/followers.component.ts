import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FollowService } from 'src/app/auth/services/follow.service';
import { User } from 'src/app/shared/models/user.inteface';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  private mounth = [0, 0, 0];
  public lineChartData: ChartDataSets[] = [
    { data: this.mounth, label: 'Seguidores' }
  ];
  public lineChartLabels: Label[] = ['Diciembre','Enero','Febrero'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

 
  constructor(private afs: AngularFirestore,private auth:AuthService,private follow:FollowService) {
    this.user$.subscribe(user => {
        const uidUser:any = user.uid;
        this.follow.getFollowers(uidUser).subscribe(follower => {
          follower.forEach((x) => {
            var time = x['date'];
            var timeSeconds = time.seconds * 1000;
            var date = new Date(timeSeconds);
            var mounth = date.getMonth(); 
            console.log("date: ", date, " mounth: ", mounth);
            if (mounth == 0) {
              var number = this.mounth[1];
              this.mounth[1]=number+1;
            }
            if (mounth == 11) {
             var number = this.mounth[0];
             this.mounth[0]=number+1;
           }
          })
          this.lineChartData['data'] = this.mounth;
           this.chart.update();
        });
     
   })
 }
 public user$: Observable<User> = this.auth.afAuth.user;

  ngOnInit(): void {
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //  console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
   // console.log(event, active);
  }
}
