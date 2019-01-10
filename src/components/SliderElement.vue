<template>
  <div class="hello">
    <a href="#" @click="deleteElement()">x</a>

    <div class="row">
      <input type="text" v-model="title" placeholder="title"><br>
      <input type="text" v-model="image_url" placeholder="Image URL"><br>
      <input type="subtitle" v-model="subtitle" placeholder="subtitle"><br>
    </div>
    <div class="row">
        <button @click="addButton()">Add Buttons</button>
        <ul>
          <li v-for="(button,index) in buttons" >
            <div class="row">
              <a href="#" @click="removeButton(index)">x</a>
              <select v-model="button.type">
                <option value="web_url">Web URL</option>
                <option value="postback">PostBack</option>
                <option value="phone_number">Phone</option>
              </select> <br>
              <span>
                <input type="text" v-model='button.title' placeholder="title">
                <br>              
              </span>
              <span v-show="button.type =='web_url'">
                <input type="text" placeholder="url" v-model="button.url">
                <br>              
              </span>
              <span v-show="button.type!='web_url'">
                <input type="text" placeholder="payload" v-model="button.payload"><br>              
              </span>
            </div>
          </li>
        </ul>
    </div>



  </div>
</template>

<script>
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
          this.$parent.updateElement(this.slider_id,val);
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
      this.$parent.deleteElement(this.slider_id);
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
