<template>
  <div class="w-100">
    <div class="row">
      <div class="col-xl-12 mb-3">
        <div class="bg-light rounded p-3 shadow">
          <h4 class="border-bottom pb-1 mb-3 fw-bold">ภาพรวมรายปี</h4>
          <Line class="rounded p-3 border shadow-sm" :options="chartOptionsLine" :data="lineData"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6 mb-3" >
        <div class="bg-light rounded p-3 shadow">
          <h4 class="border-bottom pb-1 mb-3 fw-bold">เปรียบเทียบยอดตามบริษัท</h4>
          <Bar id="my-chart-id" class="rounded p-3 border shadow-sm" :options="chartOptions" :data="chartDataCompany"/>
        </div>
      </div>
      <div class="col-xl-6 mb-3">
        <div class="bg-light rounded p-3 shadow ms-xl-3 ms-md-0 h-100">
          <h4 class="border-bottom pb-1 mb-3 fw-bold">ยอดเคลมของพนักงาน</h4>
          <Doughnut :options="donutOption" :data="donutData"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { Bar, Line, Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors, PointElement,  LineElement, ArcElement} from 'chart.js';
  import { reactive } from 'vue';

  // chart company
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors, PointElement, LineElement, ArcElement);
  const chartDataCompany = reactive({
    labels:['บจม.ซมโปะฯ', 'Allianz Ayudhya', 'บมจ.กรุงไทยพานิชประกันภัย', 'บมจ.มิตรแท้ประกันภัย', 'บมจ.ทิพยประกันภัย', 'บมจ.ไทยเศรษฐกิจฯ', 'บมจ.สินมั่นคงประกันภัย', 'บมจ.ธนชาตประกันภัย', 'คาร์เซอร์วิส'],
    datasets:[{ 
      data: [25, 20, 12, 15, 10, 17, 12, 18, 22],
      label: 'ยอดรวมจำนวนการเคลมของแต่ละบริษัท',
      backgroundColor: ['rgb(112, 128, 144)',],
      borderColor: ['rgb(112, 128, 144)'],
    borderWidth: 1,
    barThickness: 30
    }],
  });
  const chartOptions = reactive({
    responsive: true
  });
  // line
  const lineData = reactive({
    labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets:[{
      label: 'Annual Summary',
      data: [10, 12, 14, 16, 18, 8, 5, 7, 11, 10, 16, 20],
      borderColor: 'rgb(75, 192, 192)',
    }]
  });
  const chartOptionsLine = reactive({ 
    aspectRatio: 4|6,
    maintainAspectRatio: true
  });

  // donut 
  const donutData = reactive({
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [{
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }]
  });
  const donutOption = reactive({
    aspectRatio: 2|2,
    maintainAspectRatio: true
  });
</script>

<style scoped>
.row{
  --bs-gutter-x: 0rem;
}

</style>