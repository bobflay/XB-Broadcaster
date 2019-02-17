<template>
  <div class="col-md-12" style="border: solid 1px;">
    <div class="row" style="float:right;">
      <span  @click="deleteElement()" style="cursor:pointer;margin-right:5px;"><v-icon name="trash"/></v-icon></span>  
    </div>
      <div class="col-md-12" style="padding:0;">
        <FloatingLabel
        :config="{label: 'Title'}">
        <input name="elementtitle" type="text"  v-model="title">
        </FloatingLabel>
        <FloatingLabel
        :config="{label: 'Image URL'}">
        <input name="image_url" type="text"  v-model="image_url">
        </FloatingLabel>
        <FloatingLabel
        :config="{label: 'Subtitle'}">
        <input name="subtitle" type="text"  v-model="subtitle">
        </FloatingLabel>
      </div>
      <div class="row" style="padding-top:15px;padding-bottom:15px;">
      <div class="col-md-12" >
          <ul style="padding:0;">
            <li v-for="(button,index) in buttons" style="padding-top:15px;">
              <div class="row" style="margin:5px;border: 1px solid;" >
                <div class="col-md-12" style="text-align:center;" >
                  <span  @click="removeButton(index)" style="cursor:pointer;float:right;"><v-icon name="trash"/></v-icon></span>  
                </div>
                <div class='col-md-12'>
                  <select class="form-control" v-model="button.type">
                    <option value="web_url">Web URL</option>
                    <option value="postback">PostBack</option>
                    <option value="phone_number">Phone</option>
                  </select>
                </div>
                <span class="col-md-12">
                  <FloatingLabel
                  :config="{label: 'Title'}">
                  <input name="buttontitle" type="text"  v-model="button.title">
                  </FloatingLabel>
                </span>
                <span style="margin-bottom:5px;" v-show="button.type =='web_url'" class="col-md-12">
                  <FloatingLabel
                  :config="{label: 'Url'}">
                  <input name="buttonurl" type="text"  v-model="button.url">
                  </FloatingLabel>   
                </span>
                <span style="margin-bottom:5px;" v-show="button.type!='web_url'" class="col-md-12">
                  <FloatingLabel
                  :config="{label: 'Payload'}">
                  <input name="buttonpayload" type="text"  v-model="button.payload">
                  </FloatingLabel>
                </span>
              </div>
            </li>
          </ul>
      </div>
      <div class="col-md-12" style="padding-top:15px">
        <button @click="addButton()" class="btn btn-dark" style="float:right;"><v-icon name="plus"/></v-icon> Add Buttons</button>
      </div>
    </div>



  </div>
</template>

<script>
import FloatingLabel from 'vue-simple-floating-labels'

export default {
  name: 'SliderElement',
  props:['slider_id','el_data'],
  data(){
    return {
      title:'',
      image_url:'',
      subtitle:'',
      buttons:[],
      button:{
        title:'',
        url:'',
        type:'',
        payload:''
      }
    }
  },
  components: {
    FloatingLabel
  },
  computed:
  {
    output(){
      return this.toString();
    }
  },
  watch: {
      output:{

        handler:function(val)
        {
          this.$parent.$parent.$parent.updateElement(this.slider_id,val);
        },
        deep:true
       },
       el_data:{
        handler:function(val)
        {
          this.title = val.title;
          this.image_url = val.image_url;
          this.subtitle = val.subtitle;
          this.buttons = val.buttons;
        },
        deep:true
       }
    },
  methods:{
    addButton(){


      var obj = {
        'title':this.button.title,
        'type':this.button.type
      };

      if(this.type=='web_url')
      {
        obj.url = this.button.url
      }else{
        obj.payload = this.button.payload
      }

      this.buttons.push(obj);
    },

    removeButton(index){
      this.buttons.splice(index,1);
    },
    deleteElement()
    {
      this.$parent.$parent.$parent.deleteElement(this.slider_id);
    },
    toString()
    {
      return {
        title:this.title,
        image_url:this.image_url,
        subtitle:this.subtitle,
        buttons:this.buttons
      }
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
}

a {
  color: #42b983;
}

.hello{
  border: solid 1px; 
}


</style>