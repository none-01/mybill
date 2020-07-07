function loadTuBing(moneyPercentage) {
   var moneyPercentages=[];
   for(i=0;i<moneyPercentage.length;i++){
      var arr=[];
      for (j=0;j<2;j++){
         arr[0]=(moneyPercentage[i].billCategoryName+':￥'+moneyPercentage[i].countMoney);
         arr[1]=moneyPercentage[i].percentage;
      }
      moneyPercentages.push(arr);
   }
   var chart = {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
   };
   var title = {
      text: ''
   };
   var tooltip = {
      pointFormat: '<b style="font-size: 15px;color: #ffffff">{series.name}</b>'
   };
   var credits={
      enabled : false
   };
   var plotOptions = {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>',
            style: {
               color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
         }
      }
   };
   var series= [{
      type: 'pie',
      name: '',
      data: moneyPercentages

   }];

   var json = {};
   json.chart = chart;
   json.title = title;
   json.tooltip = tooltip;
   json.series = series;
   json.plotOptions = plotOptions;
   json.credits=credits;
   $('#bingtu').highcharts(json);
}