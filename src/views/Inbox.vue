<template>
  <div class="div-body">
    <Navbar/>
    <b-row class="custom-container">
      <b-col cols="12">
        <b-container style="margin-top: 5vh;">
          <b-row class="custom-row post-feed">
            <b-col class="col-md-8 col-sm-11" style="margin: auto; padding: 0px !important">
              <b-form @submit.prevent="submitForm">
                <div style="float: left; width: 80%;">
                  <input type="text" required v-model="username" class="form-control main-feed-post" placeholder="Share your words ...">                        
                </div>
                <div style="float: left; width: 17%; margin-left: 3%;">                        
                  <b-button style="width: 100%; height: 70px;" variant="primary" type="submit">Post</b-button>
                </div>
              </b-form>
            </b-col>
          </b-row>
          <b-row class="custom-row">
            <b-col class="col-md-8 col-sm-11" style="margin: auto; padding: 0px !important">
              <b-card-group deck class="text-left main-posts">
                <b-card header-tag="header" footer-tag="footer" class="uplifted">
                  <template #header>
                    <h6 class="mb-0">Name of the user</h6>
                  </template>
                  <b-card-text>Main post of the user goes here. People can see the post and daily posts. No need to add anyone. All posts are public.</b-card-text>
                  <b-button href="#" variant="primary">Like</b-button>
                  <template #footer>
                    <div>
                      <p>
                        <b>User Name</b>: H aosd osajd 0oqiwjdasndkq whdiqw nqw lkjdn qwijdnw qid wijnd ijqwndijnaksdn iqwnd kamsnd ,m
                      </p>
                    </div>
                    <b-form @submit.prevent="submitForm">
                      <div style="float: left; width: 80%;">
                        <input type="text" required v-model="username" class="form-control" placeholder="Write your comment here ...">                        
                      </div>
                      <div style="float: left; width: 17%; margin-left: 3%;">                        
                        <b-button style="width: 100%;" variant="primary" type="submit"><font-awesome-icon icon="paper-plane" /></b-button>
                      </div>
                    </b-form>
                  </template>
                </b-card>
              </b-card-group>
              <b-card-group deck class="text-left main-posts">
                <b-card header-tag="header" footer-tag="footer" class="uplifted">
                  <template #header>
                    <h6 class="mb-0">Name of the user</h6>
                  </template>
                  <b-card-text>Main post of the user goes here. People can see the post and daily posts. No need to add anyone. All posts are public.</b-card-text>
                  <b-button href="#" variant="primary">Like</b-button>
                  <template #footer>
                    <div>
                      <p>
                        <b>User Name</b>: H aosd osajd 0oqiwjdasndkq whdiqw nqw lkjdn qwijdnw qid wijnd ijqwndijnaksdn iqwnd kamsnd ,m
                      </p>
                      <p>
                        <b>User Name</b>: H aosd osajd 0oqiwjdasndkq whdiqw nqw lkjdn qwijdnw qid wijnd ijqwndijnaksdn iqwnd kamsnd ,m
                      </p>
                    </div>
                    <b-form @submit.prevent="submitForm">
                      <div style="float: left; width: 80%;">
                        <input type="text" required v-model="username" class="form-control" placeholder="Write your comment here ...">                        
                      </div>
                      <div style="float: left; width: 17%; margin-left: 3%;">                        
                        <b-button style="width: 100%;" variant="primary" type="submit"><font-awesome-icon icon="paper-plane" /></b-button>
                      </div>
                    </b-form>
                  </template>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <b-modal id="modal-success" hide-footer>
      <template v-slot:modal-title>
        SUCCESS
      </template>
      <div class="d-block text-center">
        <p class="text-left">Task status has been updated!</p>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('modal-success')">CLOSE</b-button>
    </b-modal>
    <b-modal id="modal-failure" hide-footer>
      <template v-slot:modal-title>
        FAILURE
      </template>
      <div class="d-block text-center">
        <p class="text-left">Something went wrong!</p>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('modal-failure')">CLOSE</b-button>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import axios from "../axios_instance.js";

export default {
  name: "Inbox",
  components: {
    Navbar
  },
  data() {
    return {
      username: null,
      taskProgress: null,
      taskList: [],
      openFormTaskUpdate: false,
      openForm: false,
      goalDescription: null,
      openFormEmployee: false,
      employeeEmail: null,
      selectdOrg: null,
      name: null,
      email: null,
      weblink: null,
      loadingActive: false,
      organization: [],
      employee: [],
      organizationId: null,
      userHealthStatus: null,
      userActivityStatus: null,
      priority: null,
      options: [{ value: null, text: 'Please select an organization' }],
      progressOptions: [
        { value: null, text: 'Please select progress' },
        { value: "Not Started", text: 'Not Started' },
        { value: "In Progress", text: 'In Progress' },
        { value: "Need Review", text: 'Need Review' }
      ],
      mainStatusOptions: [
        { value: null, text: 'Please select activity status' },
        { value: "active", text: 'active' },
        { value: "on leave", text: 'on leave' },
      ],
      healthStatusOptions: [
        { value: null, text: 'Please select health status' },
        { value: "Ok", text: 'Ok' },
        { value: "Ok and Vaccinated", text: 'Ok and Vaccinated' },
        { value: "Covid", text: 'Covid' },
        { value: "Need Mental Help", text: 'Need Mental Help' },
        { value: "Other Sickness", text: 'Other Sickness' }
      ],
    };
  },
  methods: {
    async submitForm() {
      try {
        let response = await axios.post('/update/users', {
          email: this.email,
          status: this.userHealthStatus,
          leave_status: this.userActivityStatus,
        });      
        localStorage.setItem('userInfo', JSON.stringify({
          activityStatus: this.userActivityStatus,
          email: this.email,
          role: "employee",
          status: this.userHealthStatus,
          username: this.userActivityStatus
        }));
        this.$bvModal.show('modal-success');
      } catch (error) {
        this.$bvModal.show('modal-failure');
      }
    },
    selectedTaskProgress(item) {
      console.log(item);
      if(item.status == 'Completed') return;
      this.selectedTaskId = item.id;
      this.taskProgress = item.status;
      this.openFormTaskUpdate = true;
    },
    async submitFormTaskUpdate() {
      this.loadingActive = true;
      let empName = "";
      try {
        let response = await axios.post('/update/tasks', {
          id: this.selectedTaskId,
          assignedTo: this.email,
          empName: this.username,
          status: this.taskProgress,
        });
        this.openFormTaskUpdate = false;
        this.taskProgress = null;
        this.assignedTo = null;        
        await this.getGoalTasks();
        this.$bvModal.show('modal-success');
      } catch (error) {
        this.$bvModal.show('modal-failure');
      }
    },
    async getGoalTasks() {
      try {
        let response = await axios.get('/read/employeetasks/'+this.email);
        this.taskList = response.data;
        console.log("tasklist: ", this.taskList);
      } catch (error) {
        // this.$bvModal.show('modal-failure');
      }
    },
  },
  async mounted() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.email = userInfo.email;
    this.userHealthStatus = userInfo.status;
    this.userActivityStatus = userInfo.activityStatus;
    await this.getGoalTasks();
  },
};
</script>

<style scoped lang="scss">
.div-body {
  overflow-x: hidden !important;
}
.custom-row {
  padding-top: 7px;
}

table,
td,
th {
  border: 1px solid #ddd !important;
  text-align: left !important;
}

table {
  border-collapse: collapse !important;
  width: 100% !important;
}

th,
td {
  padding: 7px !important;
}

td:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.previewImg {
  max-width: 100%;
  max-height: 150px;
}

.sentence {
  text-align: left;
}

.uplifted {
  box-shadow: 1px 1px 1px 1px rgb(224, 224, 224);
  border: 1px solid rgb(212, 212, 212);
}

.card-header {
  background-color: var(--accent);
}

.main-posts {
  margin-bottom: 20px;
}

.post-feed {
  margin-bottom: 15px;
}
.main-feed-post {
  height: 70px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
