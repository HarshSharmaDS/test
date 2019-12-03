import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-footfall-detail',
  templateUrl: './footfall-detail.component.html',
  styleUrls: ['./footfall-detail.component.css']
})
export class FootfallDetailComponent implements OnInit {
  visits:any[];
  dwellTime:any[];
  bouncedEngagementVisits:any[];
  Visits_new=[];
  dwellTime_new=[];
  bouncedEngagementVisits_new=[];
 
  public final_arr=[];



  private _selectedDate:Date;

  
  constructor(private ds:DashboardService) { }

  get searchTerm():Date{
    
    return this._selectedDate;
  }

  set searchTerm(value:Date){
    let d1= new Date(value);
    this._selectedDate=d1
    var d2 = new Date(this._selectedDate);
    d2.setDate(d2.getDate()-1);
    console.log(d2);
  
this.Visits_new=[];
this.dwellTime_new=[];
this.bouncedEngagementVisits_new=[];
//////////////////////Visits///////////////
    this.visits.forEach((data)=>{
      
      if(this._selectedDate.getDate()===data[0].getDate()){
      
          this.Visits_new.push(data);
          
        }
        if(d2.getDate()==data[0].getDate()){
          this.Visits_new.push(data);
        }
    
        
    });
    ///////////Dwell Time/////////////////

    this.dwellTime.forEach((data)=>{
      if(this._selectedDate.getDate()===data[0].getDate()){
          this.dwellTime_new.push(data);
          
        }
        if(d2.getDate()==data[0].getDate()){
          this.dwellTime_new.push(data);
        }
    
        
    });
    //////////////////////////Engagement Visits/////////////

    this.bouncedEngagementVisits.forEach((data)=>{
      if(this._selectedDate.getDate()===data[0].getDate()){
          this.bouncedEngagementVisits_new.push(data);
          
        }
        if(d2.getDate()==data[0].getDate()){
          this.bouncedEngagementVisits_new.push(data);
        }
    
        
    });



    console.log(this._selectedDate);
    console.log(this.Visits_new);
    console.log(this.dwellTime_new);
    console.log(this.bouncedEngagementVisits_new);


    //this._selectedDate=value;
    
    //
    this.cal();
    console.log(this.final_arr);

  }


  ngOnInit() {

    this.ds.getVisits().subscribe((res)=>{
      this.visits=res;

      console.log(res);
      this.visits.sort(this.compare_dates);
      this.visits.forEach((res)=>{
        var dt=new Date(res[0]);
        res[0]=dt;
      });
      
      
      console.log(this.visits);


      
  
      
    })
    this.ds.getDwellTime().subscribe((res)=>{
      this.dwellTime=res;
      this.dwellTime=this.dwellTime.sort(this.compare_dates);
      this.dwellTime.forEach((res)=>{
        var dt=new Date(res[0]);
        res[0]=dt;
      });

    })
    this.ds.getBouncedEngagedVisits().subscribe((res)=>{

      this.bouncedEngagementVisits=res;
      this.bouncedEngagementVisits=this.bouncedEngagementVisits.sort(this.compare_dates);
      this.bouncedEngagementVisits.forEach((res)=>{
        var dt=new Date(res[0]);
        res[0]=dt;
      });

    })
   }

   compare_dates = function(date1,date2){

    var d1= new Date(date1[0]);
    var d2= new Date(date2[0]);
    if (d1<d2) return 1;
     else if (d1>d2)  return -1;
     else return 0;
   }

  cal(){
    var temp_arr=[];
    let visit=this.Visits_new[0][1];
    let  visit_growth=this.percent(this.Visits_new[0][1],this.Visits_new[1][1]);
    let dwell_time=this.dwellTime_new[0][1];

   let change_dwell_time=this.dwellTime_new[0][1]-this.dwellTime_new[1][1];
   let Engagement=this.bouncedEngagementVisits_new[0][1];
   let change_Engagement=this.percent(this.bouncedEngagementVisits_new[0][1],this.bouncedEngagementVisits_new[1][1]);
   temp_arr.push(visit,visit_growth,dwell_time,change_dwell_time,Engagement,change_Engagement);
   this.final_arr=temp_arr;
   
  }

  percent(a,b):Number{
    let p=Math.floor(((a -b)/ b) * 100);
    return p;
  }



}
