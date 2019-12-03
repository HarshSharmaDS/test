import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { count } from 'rxjs/operators';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { Options } from 'selenium-webdriver';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})


export class DashboardComponent implements OnInit {
  visits:any[];
  //filterd_visits:any[];
  filterd_visits=[];
  

  BouncedEngagedVisits:any[];
  //filterd_BouncedEngagementVisits:any[];
  filterd_BouncedEngagementVisits=[];

  DwellTime:any[];
  //filterd_DwellTime:any[];
  filterd_DwellTime=[];

  Loyality:any[];
  filterd_Loyality:any[];

  MultipleVisits:any[];
  filterd_MultipleVisits:any[]=[];

  DwellTimeBreakdown:any[];
  filterd_DwellTimeBreakdown_next= [];
  filterd_DwellTimeBreakdown_previous= [];
  filterd_graph_1:any[]=[];
  filterd_graph_2:any[]=[];
  arr=[1,2,3,4,5,6,7];
  csv_arr:any[]=[];
  

 rating=2;
 
 

  MultiVisitChartData:any[]=[];
  private _searchTerm:Date;


  
//getter for filter
  get searchTerm():Date{
    
    return this._searchTerm;
  }

  //setter for fillter
  set searchTerm(value:Date){
   
    this._searchTerm=value;
    //console.log(typeof(this._searchTerm));
   
    
    this.filterd_visits= this.filteredVisits(value);
    this.filterd_BouncedEngagementVisits=this.filterdBouncedEngagementVisits(value);
    this.filterd_DwellTime=this.filterdDwellTime(value);
   // this.filterd_DwellTimeBreakdown=this.filterDwellTimeBreakdown(value)


    console.log(this.filterd_visits);
    console.log(this.filterd_BouncedEngagementVisits);
    console.log(this.filterd_DwellTime);
    this.csv_arr=[];
    this.csv_arr.push(this.filterd_visits[0][1],this.filterd_BouncedEngagementVisits[0][1],this.filterd_DwellTime[0][1]);
    console.log(this.csv_arr);
   
    


   
    
    let d1=new Date(this._searchTerm);

    let d2=new Date(this._searchTerm);
    d2.setDate(d2.getDate()-1);
      console.log(d1)
      console.log(d2 ) 
      this.filterd_DwellTimeBreakdown_next= [];
      this.filterd_DwellTimeBreakdown_previous= [];
     this.DwellTimeBreakdown.forEach((data)=>{
      

       let d3=new Date(data[0]);
      if(d3.getDate()==d1.getDate()){
        this.filterd_DwellTimeBreakdown_next.push(data[4]);
        
      }
      if(d3.getDate()==d2.getDate()){
        this.filterd_DwellTimeBreakdown_previous.push(data[4]);
      }
       

     })
     console.log(this.filterd_DwellTimeBreakdown_previous);
     console.log(this.filterd_DwellTimeBreakdown_next);
     console.log(this.CountCalc(this.filterd_DwellTimeBreakdown_next))
     console.log( this.CountCalc(this.filterd_DwellTimeBreakdown_previous))

     this.filterd_graph_1=this.CountCalc(this.filterd_DwellTimeBreakdown_next);
     this.filterd_graph_2=this.CountCalc(this.filterd_DwellTimeBreakdown_previous);
  
     this.barChartData = [
      {data:this.filterd_graph_1, label: 'Current Date'},
      {data: this.filterd_graph_2, label: 'Previous Date'}
    ];

   

    
  //  this.csv_arr.push(this.filterd_visits[0][1]);
  // //  this.filterdDwellTime[0][1]
  // //  this.filterdBouncedEngagementVisits[0][1]
   
    
  }

  
  //filtered Visits
  filteredVisits(SearchString:Date){
    
     console.log(SearchString);
     return this.visits.filter((data)=>{
       return data[0].indexOf(SearchString) != -1;

  });


  }
  filterdBouncedEngagementVisits(SearchString:Date){
    return this.BouncedEngagedVisits.filter((data)=>{
      return data[0].indexOf(SearchString) != -1;

 });

  }

  filterdDwellTime(SearchString:Date){
    return this.DwellTime.filter((data)=>{
      return data[0].indexOf(SearchString) != -1;

 });

  }
 
  CountCalc(arr){
      var dataArr=[];
    var count_15=0;
      var count_30=0;
      var count_60=0;
      var count_120=0;
      var count_180=0;
      var count_240=0;
      var count_greatest=0;
    arr.forEach((data)=>{
      
      
      if(data<=15){
        count_15=count_15+1;
        
      
      }
      else if(data>15 &&data<=30){
        count_30=count_30+1;
      }
      else if(data>30 && data<=60){
        count_60=count_60+1;
      }
      else if(data>60 &&data<=120){
        count_120=count_120+1;
      }
      else if(data>120 && data<=180){
        count_180=count_180+1
      }
      else if(data>180 && data<=240){
        count_240=count_240+1;
      }
      else{
        count_greatest=count_greatest+1;
      }
    })
    dataArr.push(count_15,count_30,count_60,count_120,count_180,count_240);
    return dataArr;

  }

  public barChartOptions = {
    scaleShowVerticalLines: false  ,
    responsive: true
  }

  public barChartLabels = ['(0-15)', '(15-30)', '(30-60)', '(60-120)', '(120-180)', '(180-240)', '(>240)'];
  public barChartType = 'bar';
  public barChartLegend = true;


  public barChartOptions2 = {
    scaleShowVerticalLines: false ,
    responsive: true
  }

  public barChartLabels2 = ['2-4 visits','1-visits','4-6 visits','>6 visits'];

    
  public barChartType2= 'pie';
  
  public barChartLegend2 = true;


  public lineChartOptionsCard={
    scales: {
      yAxes: [{
          ticks: {
              display: false,
          }
      }],
      xAxes: [{
        ticks: {
            display: false,
        }
    }]
  },
  borderWidth:1

}
  

  
  
    


  constructor(private ds:DashboardService) { }

  dtHolidays :any;

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Report Analysis',
    useBom: true,
    noDownload: false,
    headers: ["Visits", "Engagement Visits", "Dwell Time"]
  };
  
  //barchart dwell time card
  barChartData = [
    {data:this.filterd_graph_1, label: 'Current Date'},
    {data: this.arr, label: 'Previous Date'}
  ];
  //barchart multivisit card
  public barChartData2 = [
    {data:this.MultiVisitChartData, label: 'Number of Visits'},
    
  ];

  //line chart  Visits dashboard 
  public lineChartLabelsVisits = ['Q1', 'Q2', 'Q3', 'Q4'];
  public lineChartDataVisits= [
    {data: [120, 130, 180, 70], label: 'Visits per hour'},
    
  ];

  //cardvisits line
  public lineChartLabelsVisitsDash = ['Q1', 'Q2', 'Q3', 'Q4'];
  public lineChartDataVisitsDash= [
    {data: [120, 130, 180, 70],label:'No of visits'},
    
  ];

  public lineChartColorsVisits = [
    { borderColor: 'rgba(67, 172, 172,0.7)',
    backgroundColor: 'rgba(67, 172, 172,0.1)' },
  
    
  ]

  //line chart card
  lineChartColorsVisitsDash=[
    { borderColor: 'rgba(41, 146, 224,4)',
    backgroundColor: 'rgb(18, 28, 54)' ,
    borderWidth:2,
     pointBorderWidth:1
  },
  ]

  public lineChartType = 'line';
    //line chart dwell time 
  public lineChartLabelsDwellTime = ['Q1', 'Q2', 'Q3', 'Q4'];
  public lineChartDataDwellTime= [
    {data: [120, 130, 180, 70], label: 'Dwell Time Breakdown'},
    
  ];

  //pie chart card dwell time breakdown
  public pieChartLabels = ['2-4 visits','1-visits','4-6 visits','>6 visits'];
  public pieChartData = [1,2,3,4];
  public pieChartType = 'pie';
  
  
  
  


  ngOnInit() {

  


    this.ds.getVisits().subscribe((res)=>{
      //var latest_date='';
      console.log("Visits");
      
      this.visits=res;
      
      for(let i=0;i<this.visits.length;i++){
        this.visits[i][0]=this.formatDate(this.visits[i][0]);
        // if(this.visits[i][0]>latest_date)
        // {
        //   latest_date=this.visits[i][0];
        // }
      }
      //console.log(latest_date);
      // for(let j=0;j<this.visits.length;j++){
      //   if(latest_date==this.visits[j][0]){
          
      //     this.filterd_visits=this.visits[j];
      
      //   }
      // }
        
      //this.visits=this.visits.sort();
      //this.filterd_visits=this.visits[0];
      this.visits=this.visits.sort();
      this.filterd_visits.push(this.visits[0]);

       
      
      console.log(this.filterd_visits);
    });


    this.ds.getBouncedEngagedVisits().subscribe((res)=>{

      var latest_date=''
      console.log("BouncedEngagedVisits");
      this.BouncedEngagedVisits=res;
      for(let i=0;i<this.BouncedEngagedVisits.length;i++){
        
        this.BouncedEngagedVisits[i][0]=this.formatDate(this.BouncedEngagedVisits[i][0]);
        if(this.BouncedEngagedVisits[i][0]>latest_date)
        {
          latest_date=this.BouncedEngagedVisits[i][0];
        }
      }
      this.BouncedEngagedVisits=this.BouncedEngagedVisits.sort();
      this.filterd_BouncedEngagementVisits.push(this.BouncedEngagedVisits[0]);

      // for(let j=0;j<this.BouncedEngagedVisits.length;j++){
      //   if(latest_date==this.BouncedEngagedVisits[j][0]){
          
      //     this.filterd_BouncedEngagementVisits=this.BouncedEngagedVisits[j];
      //   }
      // }



      //this.filterd_BouncedEngagementVisits=this.BouncedEngagedVisits;

      console.log(this.filterd_BouncedEngagementVisits);
    });

    this.ds.getDwellTime().subscribe((res)=>{
      console.log("DwellTime");
      this.DwellTime=res;
      for(let i=0;i<this.DwellTime.length;i++){
        this.DwellTime[i][0]=this.formatDate(this.DwellTime[i][0]);

      }
      this.DwellTime=this.DwellTime.sort();
      this.filterd_DwellTime.push(this.DwellTime[0]);

      console.log(this.filterd_DwellTime);
    });


      //loyalty service
    this.ds.getLoyality().subscribe((res)=>{
      console.log("Loyality");
      this.Loyality=res;
      console.log(this.Loyality);

    });


      //multiple visits Service
    this.ds.getMultipleVisits().subscribe((res)=>{
      console.log("MultipleVisits");
      this.MultipleVisits=res;
      console.log( this.MultipleVisits);
      for( let i=0;i<this.MultipleVisits.length;i++){
        this.MultiVisitChartData.push(this.MultipleVisits[i][0]);
        

      }
      console.log("chart data " + this.MultiVisitChartData);
      
      
    });


    //service DwellTimeBreakdown
    this.ds.getDwellTimeBreakdown().subscribe((res)=>{
  
      console.log("DwellTimeBreakdown");
      this.DwellTimeBreakdown=res;
      console.log(this.DwellTimeBreakdown);
      for(let i=0;i<this.DwellTimeBreakdown.length;i++){
        this.DwellTimeBreakdown[i][0]=this.formatDate(this.DwellTimeBreakdown[i][0]);

      }
      this.DwellTimeBreakdown=this.DwellTimeBreakdown.sort();

      //this.filterd_DwellTimeBreakdown.push(this.DwellTimeBreakdown[0]);
      console.log( this.DwellTimeBreakdown);


    });
   
  }

   formatDate(d)
  {
    
   var date = new Date(d)
   var dd = date.getDate(); 
   var mm = date.getMonth()+1;
   var yyyy = date.getFullYear(); 

   //var dateString = (dd <= 9 ? '0' + dd : dd) + '-' + (mm <= 9 ? '0' + mm : mm) + '-' + yyyy;

   var dateString =  yyyy+ '-' + (mm <= 9 ? '0' + mm : mm) + '-' + (dd <= 9 ? '0' + dd : dd);
   
   
   
   return dateString;
  //  if(dd<10){dd=0 +dd} 
  //  if(mm<10){mm= 0 +mm};
  //  //return d = mm+'-'+dd+'-'+yyyy
  //  return d = yyyy +'-'+mm+'-'+dd
 }

  
 downloadCSV(){
  //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
 var arr:any[]=[];
 arr.push(this.csv_arr);
 new  AngularCsv(arr, "Report Analysis", this.csvOptions);
}


 

  

}
