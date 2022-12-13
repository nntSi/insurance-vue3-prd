<template>
  <div id="homeview">
    <div>
      <form class="" @submit.prevent="createClaim">
        <div class="card-light bg-light shadow mb-3 p-5">
          <div class="ps-3 pe-3">
            <h1 class="mb-4 text-center mt-4 pb-5">ออกเลขการทำเคลม</h1>
            <div class="width">
              <div class="row mb-1">
                <div class="col-md-6 mb-sm-2">
                  <label>วันที่รับแจ้ง</label>
                  <DatePicker class="datepicker" v-model="date" :enableTimePicker="false" locale="th" :dayNames="['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.']" :format="format" @update:modelValue="format"/>
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>เวลารับเรื่อง</label>
                  <DatePicker class="datepicker" v-model="time" timePicker @update:model-value="gettime"/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-sm-2">
                  <label>บริษัทประกันภัย</label>
                  <select class="form-select" v-model="claim_for_send.company"  required>
                    <option value="">เลือกบริษัท</option>
                    <option v-for="(item, index) in data_inintail.company" :key="index">{{item['company_name']}}</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-sm-2">
                  <label>ประเภทการเคลม</label>
                  <select class="form-select" v-model="claim_for_send.type" @change="showDryForm" required>
                    <option selected>เคลมสด</option>
                    <option>เคลมแห้ง</option>
                    <option>ติดตามผลคดี</option>
                  </select>
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>จ่ายงานโดย</label>
                  <input type="text" class="form-control" placeholder="john" v-model="claim_for_send.source_employee">
                </div>
              </div>
              <div class="row" v-if="isDry">
                <div class="col-md-6 mb-sm-2">
                  <label>วันนัด</label>
                  <input type="text" class="form-control" placeholder="วันที่ 4 ธันวานคม 25xx" v-model="claim_for_send.date_dry">
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>เวลา</label>
                  <input type="text" class="form-control" placeholder="16:00" v-model="claim_for_send.time_dry" >
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-sm-2">
                  <label>สถานที่</label>
                  <input type="text" class="form-control" placeholder="อ.เมือง จ.เชียงราย" v-model="claim_for_send.location" required>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-sm-2">
                  <label>ลักษณะอุบัติเหตุ</label>
                  <input type="text" class="form-control" placeholder="ประกันชนท้าย..." v-model="claim_for_send.accident">
                </div>
                <div class="col-md-6 mb-sm-2">
                  <!-- {{claim_for_send.employee}} -->
                  <label>พนักงานรับแจ้ง</label>
                  <select class="form-select" v-model="claim_for_send.employee" required>
                    <option value="">พนักงาน</option>
                    <option v-for="(item, index) in data_inintail.employee" :key="index">{{item['name']}}</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-sm-2">
                  <label>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</label>
                  <select class="form-select" v-model="inspector_id" @change="getMobile(inspector_id)" required>
                    <option value="">เจ้าหน้าที่</option>
                    <option v-for="(item, index) in data_inintail.inspector" :key="index" :value="item['id']">{{item['title']}}{{item['firstname']}} {{item['lastname']}}</option>
                  </select>
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>เบอร์ติดต่อ</label>
                  <input type="text" class="form-control bg-light" v-model="claim_for_send.inspector_mobile" required readonly>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <button class="btn btn-darkblue w-25 ms-auto me-3 shadow rounded" type="submit" :data-bs-toggle="bs" @mouseover="btnSubmitState" data-bs-target="#resultCreateClaim">บันทึกและออกเลขเคลม</button>
          <button type="button" class="btn btn-gray w-25 rounded shadow" >ยกเลิก</button>
        </div>
      </form>
    </div>
    <!-- {{claim_for_send.time}} -->
    <form action="" @submit.prevent="updateAndMakePdf">
      <div class="modal fade" id="resultCreateClaim" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">เลขเคลมที่ <b class="text-success">{{data_claim_modal.data_res.svh_code}}</b></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="border p-2 mb-2 rounded">
                    <h5 class="border-bottom pb-2">กลุ่ม Survey Hub อบ.</h5>
                    {{data_claim_modal.data_res.date}} <br>
                    <!-- <b>วันที่รับแจ้ง :</b> 5 ธันวาคม 2565 -->
                    <b>รับแจ้งอุบัติเหตุ :</b> {{data_claim_modal.data_res.company}} <br>
                    <b>ประเภท :</b> {{data_claim_modal.data_res.type}} {{data_claim_modal.data_res.date_dry}} {{data_claim_modal.data_res.time_dry}}<br>
                    <b>จ่ายงานโดย :</b> {{data_claim_modal.data_res.source_employee}} <br>
                    <b>สถานที่ :</b> {{data_claim_modal.data_res.location}} <br>
                    <b>ลักษณะ อบ. :</b> {{data_claim_modal.data_res.accident}} <br>
                    <b>พนักงานรับแจ้ง :</b> {{data_claim_modal.data_res.employee}} <br>
                    <b>เวลารับเรื่อง :</b> {{data_claim_modal.data_res.time}} <br>
                    <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ :</b> {{data_claim_modal.data_res.inspector}} {{data_claim_modal.data_res.inspector_mobile}} <br>
                    <b>เลขเซอร์เวย์ :</b> {{data_claim_modal.data_res.svh_code}}
                  </div>
                  <div class="border p-2 rounded">
                    <h5 class="border-bottom pb-2">กลุ่มประกัน</h5>
                    {{data_claim_modal.data_res.date}} <br>
                    <!-- <b>วันที่รับแจ้ง :</b> 5 ธันวาคม 2565 -->
                    <b>บริษัทประกันภัย :</b> {{data_claim_modal.data_res.company}} <br>
                    <b>วันที่รับแจ้ง :</b> {{data_claim_modal.data_res.date}} <br>
                    <b>ลักษณะ :</b> {{data_claim_modal.data_res.type}} {{data_claim_modal.data_res.date_dry}} {{data_claim_modal.data_res.time_dry}} <br>
                    <b>สถานที่ :</b> {{data_claim_modal.data_res.location}} <br>
                    <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ :</b> {{data_claim_modal.data_res.inspector}} {{data_claim_modal.data_res.inspector_mobile}} <br>
                    <b>เลขเซอร์เวย์ :</b> {{data_claim_modal.data_res.svh_code}} <br>
                    <b>{{data_claim_modal.data_res.employee}} ;</b> รับแจ้งฯ
                  </div>
                </div>
                <div class="col-md-6 ps-0">
                  <div class="p-3 rounded border h-100">
                    <h4 class="border-bottom pb-1">ข้อมูลเพิ่มเติม</h4>
                    <label>จังหวัด</label>
                    <select class="form-select mt-0 mb-3" aria-label="Default select example" v-model="claim_for_update.province" @change="showDistricByPRID(claim_for_update.province)">
                      <option value="">เลือกจังหวัด</option>
                      <option v-for="(item, index) in data_inintail.province" :key="index" :value="item['id']">{{item['name']}}</option>
                    </select>
                    <label>อำเภอ</label>
                    <select class="form-select mt-0  mb-3" aria-label="Default select example" v-model="claim_for_update.district">
                      <option value="">อำเภอ</option>
                      <option v-for="(item, index) in data_inintail.district" :key="index" :value="item['id']">{{item['name']}}</option>
                    </select>
                    <h4 class="border-bottom pb-1 mt-4">เกี่ยวกับผู้เอาประกัน</h4>
                    <label>ชื่อผู้เอาประกัน</label>
                    <input type="text" class="form-control  mb-3" v-model="claim_for_update.customer_claim_name" placeholder="คุณ...">
                    <label>เบอร์ติดต่อผู้เอาประกัน หรือผู้ขับขี่</label>
                    <input type="text" class="form-control mb-3" v-model="claim_for_update.customer_claim_mobile" placeholder="09xx">
                    <!-- license_plate -->
                    <label>ทะเบียนรถ</label>
                    <input type="text" class="form-control mb-3" v-model="claim_for_update.license_plate" placeholder="กกขขxx">
                    <label>ยี่ห้อรถ</label>
                    <input type="text" class="form-control" v-model="claim_for_update.brand_car" placeholder="Honda cvic">
                    <!-- {{claim_for_update}} -->
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-warning" ><i class="bi bi-file-earmark-pdf-fill me-2"></i>บันทึกและพิมพ์ไฟล์</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearModal">ปิด</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- pr ds unit -->
    <!-- <button @click="downloadClaimFile">GetPDF</button> -->
  </div>
</template>

<script setup lang="ts">
import { server, apiUrl } from "../services/constants";
import { onMounted, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import DatePicker from '@vuepic/vue-datepicker';
import axios from "axios";
import jsPDF from 'jspdf';
import { sarabun, sarabunbold } from '../fonts/fonts'
import { response } from "express";

const store = useStore();
const state = reactive({ loginState: store.getters["auth/myAccount"] });

// setting when page is created
const data_inintail = reactive({
  inspector:{},
  company: {},
  employee: {},
  province: {},
  district: {}
});
const getPageData = async () => {
  const data_onpage = await axios(apiUrl +'/claim/page');
  /* console.log(await data_onpage.data); */
  data_inintail.inspector = await data_onpage.data.inspector;
  data_inintail.company = await data_onpage.data.company;
  data_inintail.employee = await data_onpage.data.employee;
  data_inintail.province = await data_onpage.data.province;
  data_inintail.district = await data_onpage.data.district;
  /* console.log(data_onpage.data); */
};
onMounted(() => {
  store.dispatch({
    type: "auth/restoreLogin",
  });
  getPageData();
});

// componets
const date = ref(new Date());

// date picker format
const format = (date:any) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() + 543;
  
  let dayfi = '' + day;
  let monthfi = '' + month;
  
  if(dayfi.length == 1){
    dayfi = '0'+ dayfi;
  }else{
    dayfi = '' + dayfi;
  }
  if(monthfi.length == 1){
    monthfi = '0'+ monthfi;
  }else{
    monthfi = '' + monthfi;
  }
  const month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
  claim_for_send.date =  `${year}-${monthfi}-${dayfi}`;
  return `วันที่ ${day} ${month_th[month - 1]} ${year}`;
};
// time
const time = ref({ 
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
});
// format time
const gettime = () => {
  let hours:string = '' + time.value.hours;
  if(hours.length == 1){
    hours = '0' + hours;
  }else{
    hours = '' + hours;
  }
  let minutes:string = '' + time.value.minutes;
  if(minutes.length == 1){
    minutes = '0' + minutes;
  }else{
    minutes = '' + minutes;
  }
  claim_for_send.time = hours + ':' + minutes
}

// send data
const isDry = ref(false)
const inspector_id = ref("");
const claim_for_send = reactive({
  company:"",
  date:"",
  time: "",
  type: "เคลมสด",
  location: "",
  accident: "",
  employee: "",
  inspector: "",
  inspector_mobile: "",
  source_employee: "",
  username: localStorage.getItem(server.USERNAME),
  token: localStorage.getItem(server.TOKEN_KEY),
  date_dry: "",
  time_dry: "",
  sts: 1,
  province: 0,
  district: 0,
  brand_car: "",
  customer_claim_mobile: "",
  customer_claim_name: "",
  license_plate: ""
});
// reset form
const resetClaimForm = () => {
  claim_for_send.company = "",
  claim_for_send.location = "",
  claim_for_send.accident = "",
  claim_for_send.employee = "",
  claim_for_send.inspector = "",
  claim_for_send.inspector_mobile = "",
  claim_for_send.source_employee = "",
  claim_for_send.date_dry = "",
  claim_for_send.time_dry = "",
  claim_for_send.time = ""
};

// get mobile inspector
const getMobile = async (inspector_id:string) => {
  const inspector_data = await axios( apiUrl + '/inspector/getbyid/' + inspector_id)
  .then(response => {
    console.log(response.data.inspector[0])
    claim_for_send.inspector = response.data.inspector[0].title + response.data.inspector[0].firstname + ' ' + response.data.inspector[0].lastname;
    claim_for_send.inspector_mobile = response.data.inspector[0].mobile;
  });
  /* for (let i in inspector_data.data.inspector){
    if(i == inspector_id){
      console.log(i)
      const j = +i;
      const inspector_choose = inspector_data.data.inspector[j-1];
      claim_for_send.inspector = inspector_choose['title'] + inspector_choose['firstname'] + ' ' + inspector_choose['lastname'];
      claim_for_send.inspector_mobile = inspector_choose['mobile']
      console.log(claim_for_send.inspector, claim_for_send.inspector_mobile)
    }
  } */
};

const showDryForm = async () => {
  if(await claim_for_send.type == 'เคลมแห้ง' || await claim_for_send.type == 'ติดตามผลคดี'){
    isDry.value = true;
    return;
  }
  isDry.value = false;
};

// create data
const createClaim = async () => {
  if(claim_for_send.company == "" || claim_for_send.date == "" || claim_for_send.type == "" || claim_for_send.location == "" ||
    claim_for_send.employee == "" || claim_for_send.inspector == "" || claim_for_send.inspector_mobile == "" ){
      /* display.value = 'none'; */
    return alert("กรุณากรอกข้อมูลให้ครบท้วน");
  }if(claim_for_send.time == ""){
    return alert("กรุณาเลือกเวลาด้วยครับ");
  }
  await axios.post(apiUrl + "/claim/create", claim_for_send)
  .then(response => {
    if (response.data.status == false){
      alert(response.data.message);
      return;
    }
    // operation date
    const month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    const dateArray = response.data.body[0].date.split("-");
    /* console.log(`วันที่ ${parseInt(dateArray[2])} ${month_th[parseInt(dateArray[1]) - 1]} ${dateArray}`); */
    console.log(response.data.body[0]);
    data_claim_modal.data_res.date = `วันที่ ${parseInt(dateArray[2])} ${month_th[parseInt(dateArray[1]) - 1]} ${dateArray[0]}`
    data_claim_modal.data_res.company = response.data.body[0].company
    data_claim_modal.data_res.type = response.data.body[0].type
    data_claim_modal.data_res.source_employee = response.data.body[0].source_employee
    data_claim_modal.data_res.location = response.data.body[0].location
    data_claim_modal.data_res.accident = response.data.body[0].accident
    data_claim_modal.data_res.employee = response.data.body[0].employee
    data_claim_modal.data_res.time = response.data.body[0].time
    data_claim_modal.data_res.inspector = response.data.body[0].inspector
    data_claim_modal.data_res.inspector_mobile = response.data.body[0].inspector_mobile
    data_claim_modal.data_res.svh_code = response.data.body[0].svh_code
    data_claim_modal.data_res.date_dry = response.data.body[0].date_dry
    data_claim_modal.data_res.time_dry = response.data.body[0].time_dry
    resetClaimForm();
  })
};

// data for show
const data_claim_modal = reactive({data_res:{
  date: "",
  company: "",
  type: "",
  source_employee: "",
  location: "",
  accident: "",
  employee: "",
  time: "",
  inspector: "",
  inspector_mobile: "",
  svh_code: "",
  date_dry: "",
  time_dry: "",
  brand_car: ""
}});

const bs = ref("");
const btnSubmitState = () => {
  if(claim_for_send.company == "" || claim_for_send.date == "" || claim_for_send.type == "" || claim_for_send.location == "" ||
    claim_for_send.employee == "" || claim_for_send.inspector == "" || claim_for_send.inspector_mobile == "" ){
    bs.value = "bs"
    /* return alert("กรุณากรอกข้อมูลให้ครบท้วน"); */
  }else{
    bs.value = "modal"
  }
};

// claim update for make pdf
const claim_for_update = reactive({
  province: 0,
  district: 0,
  brand_car: "",
  customer_claim_mobile: "",
  customer_claim_name: "",
  license_plate: ""
})
const showDistricByPRID = (provinceID:number) => {
 console.log(provinceID);
 axios(apiUrl + '/claim/getdistrict/' + provinceID).then( response => {
  /* console.log(response.data.body); */
  data_inintail.district = response.data.body;
 });
};

const updateAndMakePdf = () => {
  if(claim_for_update.province == 0 || claim_for_update.district == 0 || claim_for_update.customer_claim_mobile == "" || claim_for_update.customer_claim_name == "" || claim_for_update.license_plate == ""){
    return alert("กรอกข้อมูลไม่ครบ");
  }
  axios.patch(apiUrl + '/claim/updateforpdf/' + data_claim_modal.data_res.svh_code, claim_for_update).then(response => {
    if(response.data.status == true){
      downloadClaimFile(data_claim_modal.data_res.svh_code);
      return;
    }
  });
};

// make pdf
const downloadClaimFile = async (svhcode:string) => {

  var pdf = new jsPDF();
  let width = pdf.internal.pageSize.getWidth();
  const fontbold = () => {
    pdf.addFileToVFS("THSarabunBold.ttf", sarabunbold);
    pdf.addFont('THSarabunBold.ttf', 'sarabunBold', 'normal');
    pdf.setFont('sarabunBold');
  };
  const fontnormal = () => {
    pdf.addFileToVFS("THSarabun.ttf", sarabun);
    pdf.addFont('THSarabun.ttf', 'sarabun', 'normal');
    pdf.setFont('sarabun');
  }
  // readata
  await axios(apiUrl + '/claim/readdata/' + svhcode).then(response => {
    const month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    console.log(response.data);
    const dateArray = response.data.body.date.split("-");
    let svh_code = `เลขเคลม : ${response.data.body['svh_code']}`
    let date = `วันที่ ${parseInt(dateArray[2])} ${month_th[parseInt(dateArray[1]) - 1]} ${dateArray[0]} เวลารับแจ้ง : ${response.data.body.time}`;
    /* let time = `เวลารับแจ้ง : ${response.data.body['time']}`;
    let location = `${response.data.body['location']}`; */
    /* console.log(response.data); */
    // head code
    let padding = 25
    fontbold();
    pdf.setFontSize(padding);
    pdf.text(svh_code, width/2, padding, {align:'center'});
    // content
    fontnormal();
    // date
    pdf.setFontSize(16);
    pdf.text(date, 210-padding, 42, {align:'right'});
    // employee
    fontbold();
    pdf.text('พนักงานรับแจ้ง : ', padding, 42);
    fontnormal();
    pdf.text(response.data.body['employee'], 53, 42);
    // inspector
    fontbold();
    pdf.text('เจ้าหน้าที่ตรวจสอบอุบัติเหตุ : ', padding, 50);
    fontnormal();
    pdf.text(response.data.body['Inspector'] + ' ' +  response.data.body['inspector_mobile'], 72, 50);
    // claim
    // company
    fontbold();
    pdf.text('บริษัทประกันภัย : ', padding, 58);
    fontnormal();
    pdf.text(response.data.body['company'], 54, 58);
    // type
    fontbold();
    pdf.text('ประเภท : ', padding, 66);
    fontnormal();
    pdf.text(response.data.body['type'] + ' ' + response.data.body['date_dry'] + ' ' + response.data.body['time_dry'], 41, 66);
    // location
    fontbold();
    pdf.text('สถานที่เกิดเหตุ : ', padding, 74);
    fontnormal();
    pdf.text(response.data.body['location'], 53, 74);
    // provicne distric
    fontbold();
    pdf.text('อำเภอ : ', padding, 82);
    fontnormal();
    pdf.text(response.data.district['name'], 39, 82);
    fontbold();
    pdf.text('จังหวัด : ', 70, 82);
    fontnormal();
    pdf.text(response.data.body['name'], 86, 82);
    // source employee
    fontbold();
    pdf.text('จ่ายงานโดย : ', padding, 90);
    fontnormal();
    pdf.text(response.data.body['source_employee'], 50, 90);
    // cust
    fontbold();
    pdf.text('ชื่อผู้เอาประกัน : ', padding, 98);
    fontnormal();
    pdf.text(response.data.body['customer_claim_name'], 52, 98);
    fontbold();
    pdf.text('เบอร์ติดผู้เอาประกัน หรือผู้ขับขี่ : ', padding, 106);
    fontnormal();
    pdf.text(response.data.body['customer_claim_mobile'], 77, 106);
    fontbold();
    pdf.text('ทะเบียนรถ : ', padding, 114);
    fontnormal();
    pdf.text(response.data.body['license_plate'], 46, 114);
    fontbold();
    pdf.text('ยี่ห้อรถ : ', padding, 122);
    fontnormal();
    pdf.text(response.data.body['brand_car'], 41, 122);
    
    // export
    pdf.save('hello.pdf');
  });
};

const clearModal = () => {
  claim_for_update.province = 0,
  claim_for_update.district = 0,
  claim_for_update.brand_car = "",
  claim_for_update.customer_claim_mobile = "",
  claim_for_update.customer_claim_name = "",
  claim_for_update.license_plate = ""
};

</script>

<style scoped>
.fs-14 {
  font-size: 14px;
}

label {
  color: var(--text-color);
  font-weight: 600;
  font-size: 20px;
}

::placeholder{
  font-size: 16px;
  color: rgb(211, 211, 211);
}

</style>
