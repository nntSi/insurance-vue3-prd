<template>
  <div>
    <div class="card-light bg-light shadow mb-3 d-flex align-items-center">
      <i class="bi bi-search me-3 ms-2"></i>
      <input class="border-0 w-50 bg-transparent" placeholder="Search..." type="text" v-model="filter.search" @keyup="searchAction">
      <!-- <p class="mb-0 ms-auto me-2"><b>FILTER</b></p> -->
      <!-- <DatePicker class="datepicker ms-auto" v-model="date" :enableTimePicker="false" locale="th" :dayNames="['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.']" :format="format" @update:modelValue="format"/> -->
    </div>
    <div class="card-light bg-light shadow">
      <table class="table table-bordered mb-0 table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-primary-nt">หมายเลขเซอเวย์</th>
            <th scope="col" class="text-primary-nt">บริษัทประกันภัย</th>
            <th scope="col" class="text-primary-nt">พนักงานรับแจ้ง</th>
            <th scope="col" class="text-primary-nt">เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</th>
            <th scope="col" class="text-primary-nt">วันที่ (ปี-เดือน-วัน)</th>
            <th scope="col" class="text-primary-nt">เวลารับเรื่อง</th>
            <th scope="col" class="text-primary-nt text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data_for_table.body" :key="index">
            <th scope="row"><a type="button" class="text-decoration" data-bs-toggle="modal" data-bs-target="#dataClaim" @click="showClaimdata(item['svh_code'])">{{item['svh_code']}}</a></th>
            <td>{{item['company']}}</td>
            <td>{{item['employee']}}</td>
            <td>{{item['inspector']}}</td>
            <td>{{item['date']}}</td>
            <td>{{item['time']}}</td>
            <td class="p-0 text-center" style="width: 13%;">
              <a type="button" class="me-2 text-decoration-none py-1 px-2 text-dark fw-bold text-center mt-1 bg-warning rounded shadow-sm" @click="showClaimdata(item['svh_code'])" data-bs-toggle="modal" data-bs-target="#dataClaim">
                <i class="bi bi-file-earmark-word-fill"></i>
                แก้ไข
              </a>
              <a type="button" class="text-decoration-none py-1 px-2 text-dark fw-bold text-center mt-1 bg-danger rounded shadow-sm" @click="modaldelete(item['svh_code'])" data-bs-toggle="modal" data-bs-target="#delete_alert">
                <i class="bi bi-trash3-fill"></i>
                ลบข้อมูล
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" class="mt-2">
        <ul class="pagination mb-0">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-if="!(filter.page - 1 == 0)"><a class="page-link" type="button" @click="decreasePage">{{filter.page - 1}}</a></li>
          <li class="page-item"><a class="page-link bg-light" type="button">{{filter.page}}</a></li>
          <li class="page-item" v-if="!(filter.page == filter.lastpage)"><a class="page-link" type="button" @click="increasePage">{{filter.page + 1}}</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- {{filter}} -->
    <div class="modal fade" id="delete_alert" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitDelete">
            <div class="modal-body p-5">
              <div>
                <h2 class="text-center">ยืนยันการลบข้อมูล</h2>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <input type="text" class="border-0 text-center" v-model="svhcode" readonly>
              </div>
              <div class="mt-4 d-flex justify-content-center">
                <button type="submit" class="btn btn-danger me-3" data-bs-dismiss="modal">ยืนยันการลบข้อมูล</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- show data cialm -->
    <form @submit.prevent="updateAndMakePdf">
      <div class="modal fade" id="dataClaim" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <div class="d-flex align-items-center">
                <h5 class="modal-title" id="staticBackdropLabel"><b class="fs-5">เลขเคลมที่ :</b></h5>
                <input type="text" class="form-control w-50 ms-3" v-model="data_claim_modal.svh_code" placeholder="กกขขxx">
              </div>
              <!-- <h5 class="modal-title" id="staticBackdropLabel">เลขเคลมที่ <b class="text-success">{{data_claim_modal.svh_code}}</b></h5> -->
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-lg-6">
                  <div class="border p-2 mb-2 rounded">
                    <div class="border-bottom mb-3 pb-1 d-flex align-items-center">
                      <h5 class="mb-0">กลุ่ม Survey Hub อบ.</h5>
                      <button class="btn btnprimary border btn-sm ms-auto" type="button" data-bs-toggle="modal" data-bs-target="#showEdit">แก้ไข</button>
                    </div>
                    {{data_claim_modal.date}} <br>
                    <!-- <b>วันที่รับแจ้ง :</b> 5 ธันวาคม 2565 -->
                    <b>รับแจ้งอุบัติเหตุ :</b> {{data_claim_modal.company}} <br>
                    <b>ประเภท :</b> {{data_claim_modal.type}} {{data_claim_modal.date_dry}} {{data_claim_modal.time_dry}}<br>
                    <b>จ่ายงานโดย :</b> {{data_claim_modal.source_employee}} <br>
                    <b>สถานที่ :</b> {{data_claim_modal.location}} <br>
                    <b>ลักษณะ อบ. :</b> {{data_claim_modal.accident}} <br>
                    <b>พนักงานรับแจ้ง :</b> {{data_claim_modal.employee}} <br>
                    <b>เวลารับเรื่อง :</b> {{data_claim_modal.time}} <br>
                    <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ :</b> {{data_claim_modal.inspector}} {{data_claim_modal.inspector_mobile}} <br>
                    <b>เลขเซอร์เวย์ :</b> {{data_claim_modal.svh_code}}
                  </div>
                  <div class="border p-2 rounded">
                    <h5 class="border-bottom pb-2">กลุ่มประกัน</h5>
                    {{data_claim_modal.date}} <br>
                    <!-- <b>วันที่รับแจ้ง :</b> 5 ธันวาคม 2565 -->
                    <b>บริษัทประกันภัย :</b> {{data_claim_modal.company}} <br>
                    <b>วันที่รับแจ้ง :</b> {{data_claim_modal.date}} <br>
                    <b>ลักษณะ :</b> {{data_claim_modal.type}} {{data_claim_modal.date_dry}} {{data_claim_modal.time_dry}} <br>
                    <b>สถานที่ :</b> {{data_claim_modal.location}} <br>
                    <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ :</b> {{data_claim_modal.inspector}} {{data_claim_modal.inspector_mobile}} <br>
                    <b>เลขเซอร์เวย์ :</b> {{data_claim_modal.svh_code}} <br>
                    <b>{{data_claim_modal.employee}} ;</b> รับแจ้งฯ
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="p-3 rounded border h-100">
                      <h4 class="border-bottom pb-1">ข้อมูลเพิ่มเติม</h4>
                      <label>จังหวัด</label>
                      <select class="form-select mt-0 mb-3" aria-label="Default select example" v-model="data_claim_modal.province" @change="showDistricByPRID(data_claim_modal.province)">
                        <option value="">เลือกจังหวัด</option>
                        <option v-for="(item, index) in data_inintail.province" :key="index" :value="item['id']">{{item['name']}}</option>
                      </select>
                      <label>อำเภอ</label>
                      <select class="form-select mt-0  mb-3" aria-label="Default select example" v-model="data_claim_modal.district">
                        <option value="">อำเภอ</option>
                        <option v-for="(item, index) in data_inintail.district" :key="index" :value="item['id']">{{item['name']}}</option>
                      </select>
                      <h4 class="border-bottom pb-1 mt-4">เกี่ยวกับผู้เอาประกัน</h4>
                      <label>ชื่อผู้เอาประกัน</label>
                      <input type="text" class="form-control  mb-3" v-model="data_claim_modal.customer_claim_name" placeholder="คุณ...">
                      <label>เบอร์ติดต่อผู้เอาประกัน หรือผู้ขับขี่</label>
                      <input type="text" class="form-control mb-3" v-model="data_claim_modal.customer_claim_mobile" placeholder="09xx">
                      <!-- license_plate -->
                      <label>ทะเบียนรถ</label>
                      <input type="text" class="form-control mb-3" v-model="data_claim_modal.license_plate" placeholder="กกขขxx">
                      <label>ยี่ห้อรถ</label>
                      <input type="text" class="form-control" v-model="data_claim_modal.brand_car" placeholder="Honda cvic">
                      <!-- {{claim_for_update}} -->
                    </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-warning" ><i class="bi bi-file-earmark-pdf-fill me-2"></i>บันทึกและพิมพ์ไฟล์</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
              <!-- <button type="button" class="btn btn-primary">Understood</button> -->
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- edit modal -->
    <form @submit.prevent="updateAndMakePdf">
      <div class="modal fade" id="showEdit" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <div class="d-flex align-items-center">
                <h5 class="modal-title" id="staticBackdropLabel"><b class="fs-5">แก้ไขเลขเคลมที่ :</b></h5>
                <input type="text" class="form-control w-50 ms-2" v-model="data_claim_modal.svh_code" placeholder="กกขขxx">
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row mb-1">
                <div class="col-md-6 mb-sm-2">
                  <label>วันที่รับแจ้ง <b class="text-danger">(ปี-เดือน-วัน)</b></label>
                  <input type="text" class="form-control" v-model="data_claim_modal.date_update">
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>เวลารับเรื่อง</label>
                  <input type="text" class="form-control" v-model="data_claim_modal.time">
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-sm-2">
                  <label>บริษัทประกันภัย</label>
                  <select class="form-select" v-model="data_claim_modal.company"  required>
                    <option value="">เลือกบริษัท</option>
                    <option v-for="(item, index) in data_inintail.company" :key="index">{{item['company_name']}}</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-sm-2">
                  <label>ประเภทการเคลม</label>
                  <select class="form-select" v-model="data_claim_modal.type" @change="showDryForm" required>
                    <option>เคลมสด</option>
                    <option>เคลมแห้ง</option>
                    <option>ติดตามผลคดี</option>
                  </select>
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>จ่ายงานโดย</label>
                  <input type="text" class="form-control" placeholder="john" v-model="data_claim_modal.source_employee">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-sm-2">
                  <label>วันนัด</label>
                  <input type="text" class="form-control" v-model="data_claim_modal.date_dry">
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>เวลา</label>
                  <input type="text" class="form-control" v-model="data_claim_modal.time_dry" >
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-sm-2">
                  <label>สถานที่</label>
                  <input type="text" class="form-control" placeholder="อ.เมือง จ.เชียงราย" v-model="data_claim_modal.location" required>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-sm-2">
                  <label>ลักษณะอุบัติเหตุ</label>
                  <input type="text" class="form-control" placeholder="ประกันชนท้าย..." v-model="data_claim_modal.accident">
                </div>
                <div class="col-md-6 mb-sm-2">
                  <!-- {{data_claim_modal.employee}} -->
                  <label>พนักงานรับแจ้ง</label>
                  <select class="form-select" v-model="data_claim_modal.employee" required>
                    <option :value="data_claim_modal.employee">{{ data_claim_modal.employee }}</option>
                    <option v-for="(item, index) in data_inintail.employee" :key="index">{{item['name']}}</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-sm-2">
                  <label>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</label>
                  <select class="form-select" v-model="data_claim_modal.inspector_id" @change="getMobile(data_claim_modal.inspector_id)">
                    <option :value="data_claim_modal.inspector_id">{{ data_claim_modal.inspector }}</option>
                    <option v-for="(item, index) in data_inintail.inspector" :key="index" :value="item['id']">{{item['title']}}{{item['firstname']}} {{item['lastname']}}</option>
                  </select>
                  <!-- <input type="text" class="form-control" v-model="data_claim_modal.inspector_id" readonly> -->
                </div>
                <div class="col-md-6 mb-sm-2">
                  <label>เบอร์ติดต่อ</label>
                  <input type="text" class="form-control bg-light" v-model="data_claim_modal.inspector_mobile" required readonly>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
              <button type="submit" class="btn btn-warning fw-semibold">บันทึกและพิมพ์ไฟล์</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- {{filter.date}} -->
  </div>
</template>

<script setup lang="ts">
  import DatePicker from '@vuepic/vue-datepicker';
  import axios from "axios";
  import { onMounted, reactive, ref, computed } from "vue";
  import { useStore } from "vuex";
  import { apiUrl } from "@/services/constants";
  import jsPDF from 'jspdf';
  import { sarabun, sarabunbold } from '../fonts/fonts';
  import { dwnClaim } from "@/reports/claim_report"
  
  const store = useStore();
  // data innitail
  const data_inintail = reactive({
    inspector:{},
    company: {},
    employee: {},
    province: {},
    district: {}
  });

  // get data table
  // data initail state
  const data_for_table = reactive({body:[]});
    // filter data
    const filter = reactive({
    page: 1,
    search: "",
    lastpage: 0,
    date: ""
  });
  const getTable = () => {
    bufferSearch();
  }
  const getPageData = async () => {
    const data_onpage = await axios(apiUrl +'/claim/page');
    /* console.log(await data_onpage.data); */
    data_inintail.inspector = await data_onpage.data.inspector;
    data_inintail.company = await data_onpage.data.company;
    data_inintail.employee = await data_onpage.data.employee;
    data_inintail.province = await data_onpage.data.province;
    /* data_inintail.district = await data_onpage.data.district; */
    /* console.log(data_onpage.data); */
  };
  // buffer function
  const bufferSearch = () => {
    if(filter.search == ""){
      axios(apiUrl + '/claim/gettable/' + filter.page + '/' + 'svh').then(response => {
        data_for_table.body = response.data.body;
        filter.lastpage = response.data.lastpage;
      });
    }else{
      axios(apiUrl + '/claim/gettable/' + filter.page + '/' + filter.search).then(response => {
        data_for_table.body = response.data.body;
        filter.lastpage = response.data.lastpage;
      });
    }
  };

  // decreasePage
  const decreasePage = () => {
    filter.page = filter.page - 1
    bufferSearch();
  };

  const increasePage = () => {
    filter.page = filter.page + 1
    bufferSearch();
  };

  // on search
  const searchAction = () => {
    bufferSearch();
  };
  // oncreate
  onMounted(() => {
    store.dispatch({
      type : 'auth/restoreLogin',
    });
    getTable();
    getPageData();
  });

  // svhcode
  const svhcode = ref("");
  // show modaldelete
  const modaldelete = (svh_code:string) => {
    svhcode.value = svh_code;
  };
  // submit delete
  const submitDelete = async () => {
    console.log(svhcode.value);
    axios(apiUrl + '/claim/page/delete/' + svhcode.value).then(response => {
      console.log(response.data.message);
      bufferSearch();
    });
  };

  const showClaimdata = async (svhcode:string) => {
    axios(apiUrl + '/claim/readdata/' + svhcode).then(response => {
      console.log(response.data)
      /* console.log(response.data.body['accident']); */
      const month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
      const dateArray = response.data.body.date.split("-");
      data_claim_modal.date = `วันที่ ${parseInt(dateArray[2])} ${month_th[parseInt(dateArray[1]) - 1]} ${dateArray[0]}`;
      data_claim_modal.company = response.data.body['company'];
      data_claim_modal.type = response.data.body['type'];
      data_claim_modal.source_employee = response.data.body['source_employee'];
      data_claim_modal.location = response.data.body['location'];
      data_claim_modal.accident = response.data.body['accident'];
      data_claim_modal.employee = response.data.body['employee'];
      data_claim_modal.time = response.data.body['time'];
      data_claim_modal.inspector = response.data.body['Inspector'];
      data_claim_modal.inspector_id = response.data.body['inspector_id'];
      data_claim_modal.inspector_mobile = response.data.body['inspector_mobile'];
      data_claim_modal.svh_code = svhcode;
      data_claim_modal.before_svhcode = svhcode;
      data_claim_modal.date_dry = response.data.body['date_dry'];
      data_claim_modal.time_dry = response.data.body['time_dry'];
      data_claim_modal.province = response.data.body['province'];
      showDistricByPRID(response.data.body['province']);
      data_claim_modal.district = response.data.body['district'];
      data_claim_modal.brand_car = response.data.body['brand_car'];
      data_claim_modal.customer_claim_mobile = response.data.body['customer_claim_mobile'];
      data_claim_modal.customer_claim_name = response.data.body['customer_claim_name'];
      data_claim_modal.license_plate = response.data.body['license_plate'];
      data_claim_modal.date_update = response.data.body['date'];
    });
  };

  const showDistricByPRID = (provinceID:number) => {
    console.log(provinceID);
    axios(apiUrl + '/claim/getdistrict/' + provinceID).then( response => {
    /* console.log(response.data.body); */
    data_inintail.district = response.data.body;
  });
  };

  const updateAndMakePdf = () => {
  if(data_claim_modal.province == 0 || data_claim_modal.district == 0 || data_claim_modal.customer_claim_mobile == "" || data_claim_modal.customer_claim_name == "" || data_claim_modal.license_plate == ""){
    return alert("กรอกข้อมูลไม่ครบ");
  }
  axios.patch(apiUrl + '/claim/updateforpdf/' + data_claim_modal.before_svhcode, data_claim_modal).then(response => {
    if(response.data.status == true){
      downloadClaimFile(data_claim_modal.svh_code);
      return;
    }
  });
};

  // data claim modal
  const data_claim_modal = reactive({
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
    province: 0,
    district: 0,
    brand_car: "",
    customer_claim_mobile: "",
    customer_claim_name: "",
    license_plate: "",
    date_update: "",
    before_svhcode: "",
    inspector_id: ""
  });

const downloadClaimFile = async (svhcode:string) => {
  dwnClaim(svhcode);
};

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
  data_claim_modal.date =  `${year}-${monthfi}-${dayfi}`;
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
  data_claim_modal.time = hours + ':' + minutes
  
}
const inspector_id = ref("");
const isDry = ref(false);
const showDryForm = async () => {
  if(await data_claim_modal.type == 'เคลมแห้ง' || await data_claim_modal.type == 'ติดตามผลคดี'){
    isDry.value = true;
    return;
  }
  isDry.value = false;
};
// get mobile inspector
const getMobile = async (inspector_id:string) => {
  const inspector_data = await axios( apiUrl + '/inspector/getbyid/' + inspector_id)
  .then(response => {
    console.log(response.data.inspector[0])
    data_claim_modal.inspector = response.data.inspector[0].title + response.data.inspector[0].firstname + ' ' + response.data.inspector[0].lastname;
    data_claim_modal.inspector_mobile = response.data.inspector[0].mobile;
    data_claim_modal.inspector_id = response.data.inspector[0].id;
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

</script>

<style scoped>
  input:focus{
    /* border: 0; */
    box-shadow: none;
    outline: 0;
  }
  a{
    color: var(--text-color);
  }
  a:hover{
    color: var(--text-color);
  }
  input{
    color: var(--text-color);
  }
  th a{
    color: var(--text-color);
  }
  .btnprimary:hover{
    background-color: rgb(238, 238, 238);
  }
</style>