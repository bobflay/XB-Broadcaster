<template>
  <div class="container">
    <div class="row">
        <select v-model='selected_template'>
          <option value="text">Text</option>
          <option value="slider">Slider</option>
        </select>
    </div>

    <div class="row" v-show="selected_template == 'text'">
      <input type="text" v-model="text_message">
    </div>

    <div class="row" v-show="selected_template == 'slider'">
      <div class="row">
          <button @click="addElement()">Add Element</button>
      </div>

      <div class="row" v-show="this.slider_result.length>0">
        <ul>
            <li v-for="(el,index) in this.slider_result" >

              <SliderElement :el_data="el" :slider_id="index"></SliderElement>
              
            </li>
        </ul>
      </div>

    </div>



    <div class="row">
      <textarea v-model="text_output">
        
      </textarea>      
    </div>

  </div>
</template>

<script>

import SliderElement from './SliderElement.vue'


export default {
  name: 'CreativeMessage',
  props: {
    msg: String
  },
  components: {
    SliderElement
  },
  data: function(){
    return{
      selected_template:'text',
      result:'json here',
      text_message:"",
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
      slider_result:[]
    }
  },
  watch: {
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

    addElement(){

    this.slider_result.push({});

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