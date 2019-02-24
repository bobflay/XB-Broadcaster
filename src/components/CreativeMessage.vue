<template>
    <div class="container">
        <form-wizard  shape="tab" color="#364e92">
            <h2 slot="title">Broadcaster</h2> 
            <tab-content title="Facebook Login" icon="ti-user" :before-change="checkIfUserHavePages">
                <h1>Login To Facebook</h1>
                <!-- adding your app id here -->
                <facebook-login class="button" appId="" @login="getUserData" @logout="onLogout" @sdk-loaded="sdkLoaded">
                </facebook-login>
                <img v-if="!isConnected" :src="loginImage" class="login">
                <div v-if="isConnected" class="information">
                    <h1>My Facebook Information</h1>
                    <div class="well">
                        <div class="list-item">
                            <img :src="loginImage">
                            <i>{{name}}</i>
                        </div>
                        <div class="list-item">
                            <img :src="mailImage">
                            <i>{{email}}</i>
                        </div>
                        <div class="list-item">
                            <img :src="faceImage">
                            <i>{{personalID}}</i>
                        </div>
                    </div>
                </div>
            </tab-content>
            <tab-content title="Pages" icon="ti-settings" :before-change="checkIfSetPage">
                <div class="col-md-12" style="margin-bottom: 10%;">
                    <h1>Please choose One Of your Pages</h1>
                    <v-select label="name" v-model="selected_page" :options="options"></v-select>
                </div>
            </tab-content>
            <tab-content title=" Broadcast Message" icon="ti-check">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12" style="text-align:-webkit-center;width: 50%;">
                            <select class="form-control" style="width:50%"  v-model='selected_template'>
                                <option value="text">Text</option>
                                <option value="slider">Slider</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="padding:5%;" v-show="selected_template == 'text'">
                        <input type="text" placeholder="Enter your message Here" class="form-control" v-model="text_message">
                    </div>
                    <div class="row" v-show="selected_template == 'slider'">
                        <div class="col-md-12" v-show="this.slider_result.length>0">
                            <ul class="col-md-12" style="float:left;padding-top:2%">
                                <li class="col-md-5" style="padding-top:2%;" v-for="(el,index) in this.slider_result" >
                                  <SliderElement :el_data="el" :slider_id="index"></SliderElement>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-12"  v-show="this.slider_result.length < 7">
                            <button @click="addElement()" style="float:right" class="btn btn-dark">Add Element</button>
                        </div>
                    </div>
                </div>
            </tab-content>
            <button slot="next" :disabled="!FB" type="button" class="wizard-btn" style="background-color: rgb(54, 78, 146); border-color: rgb(54, 78, 146); color: white;">
                Next
            </button>

            <button v-if="selected_template == 'text'" :disabled="!text_message" slot="finish" class="btn btn-success" @click="sendMessage()">Broadcast Message</button>

            <button v-else :disabled="this.slider_result.length == 0" slot="finish" class="btn btn-success" @click="sendMessage()">Broadcast Message</button>
        </form-wizard>
    </div>
</template>
<script>

import SliderElement from './SliderElement.vue'
import facebookLogin from 'facebook-login-vuejs';
import idImage from '../../node_modules/facebook-login-vuejs/example/src/id.svg'
import loginImage from '../../node_modules/facebook-login-vuejs/example/src/login.svg'
import mailImage from '../../node_modules/facebook-login-vuejs/example/src/mail.svg'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import faceImage from '../../node_modules/facebook-login-vuejs/example/src/face.svg'
export default {
name: 'CreativeMessage',
  props: {
    msg: String
  },
  components: {
    SliderElement,
    facebookLogin,
  },
  data: function(){
    return{
      selected_template:'text',
      idImage, loginImage, mailImage, faceImage,
      isConnected: false, 
      steps: 3,
      result:'json here',
      selected_page:'',
      pages:[],
      options:[],
      text_message:"",
      name: '',
      email: '',
      personalID: '',
      step:1,
      loadingWizard:false,
      FB:undefined,
      text_template:{    
        "messages":[
        {
          "dynamic_text": {
            "text": "",
            "fallback_text": "Hello friend!"
          } 
        }
        ]
      },
      slider_template:{    
        "messages": [
          {
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"generic",
                "elements":[
                ]
              }       
            }
          }
        ]
      },
      text_output:'',
      slider_output:'',
      element:{
        "title":"Welcome to Our Marketplace!",
        "image_url":"https://www.facebook.com/jaspers.png",
        "subtitle":"Fresh fruits and vegetables. Yum.",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://www.jaspersmarket.com",
            "title":"View Website"
          }              
        ]
      },
      slider_result:[],
        rules: {
            selected_page: [{
                required: true,
                message: 'Please choose one of your pages',
                trigger: 'change'
            }], 
        }
    }
  },
  watch: {
    pages:function(val){
        if(this.pages.length > 0){
            this.pages.forEach((item,key)=>{
                this.options.push({'name':item.name,'token':item.access_token});
            });
        }
    },
    selected_template: function (value) {
      if(value == 'text')
      {
        this.result = this.text_template;
      }else{
        this.result = this.slider_template;
      }
    },
    text_template:
    {
      handler:function(value)
      {
        this.text_output = JSON.stringify(value);
      },
      deep:true

    },
    slider_template:
    {
      handler:function(value)
      {
        this.text_output = JSON.stringify(value);
      },
      deep:true

    },
    text_message:function(value)
    {
      this.text_template.messages[0].dynamic_text.text=value;
    },

  },
  methods:{
    checkIfUserHavePages()
    {
          return new Promise((resolve, reject) => {
            if(this.pages.length == 0){
                Swal({
                    type: 'warning',
                    title: 'Warning',
                    text: 'You must have at least one page to use this application'
                })
            }
            else{
                resolve(true)
            }   
        })
    },
    setLoading: function(value) {
        this.loadingWizard = value
    },
    checkIfSetPage()
    {
        if(this.selected_page)
        {
            return true;
        }
        else
        {
            Swal({
                type: 'warning',
                title: 'Warning',
                text: 'You must choose one of your pages'
            })
            return false;
        }
    },
    getUserData() {
      var that = this;
      this.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {  
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
        }
      )
      this.FB.api('/me/accounts',
        function (response) {
            if (response && !response.error) {
                if(response.data)
                {
                  Swal({
                    type: 'success',
                    title: 'Facebook Login',
                    text: 'You have successfully logged in into the facebook'
                  })
                  that.pages = response.data;
                }
            }
        }
    );
    },
    sendMessage()
    {
      var that = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var messageId = JSON.parse(this.responseText)
          if(messageId.message_creative_id)
          {
            that.sendBroadcast(messageId.message_creative_id) 
          }
        }
      };
      xhttp.open("POST", 'https://graph.facebook.com/v2.11/me/message_creatives?access_token='+this.selected_page.token, true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.send(this.text_output);
    },
    sendBroadcast(messageId)
    {
      var param = {    
        "message_creative_id": messageId,
        "notification_type": "REGULAR",
        "messaging_type": "MESSAGE_TAG",
        "tag": "NON_PROMOTIONAL_SUBSCRIPTION"
      }
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             Swal({
                type: 'success',
                title: 'Broadcast Message',
                text: 'You have successfully broadcast your message'
              })
        }
      };
      xhttp.open("POST", 'https://graph.facebook.com/v2.11/me/broadcast_messages?access_token='+this.selected_page.token, true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.send(JSON.stringify(param));
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    addElement(){

    this.slider_result.push({});

    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
    },

    updateElement(index,value)
    {
      this.$set(this.slider_result, index, value)
      this.slider_template.messages[0].attachment.payload.elements = this.slider_result;
    },
    deleteElement(index)
    {
      this.slider_result.splice(index, 1);
      // this.slider_template.messages[0].attachment.payload.elements = [];
      // this.slider_template.messages[0].attachment.payload.elements = this.slider_result;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>