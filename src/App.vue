<!--suppress ALL -->
<template>
  <div id="app">
    <div class="menu-setting-area" style="width: 989px; height: 817px; margin:100px auto;">
      <div class="menu_preview_area">
        <div class="mobile_menu_preview">
          <div class="mobile_hd tc">厦门移动</div>
          <div class="mobile_bd">
            <ul class="pre_menu_list" id="menuList">
              <li class=" pre_menu_item  size1of3" v-for="(item,index1) in menu.item" v-if="item.type<3">
                <a href="javascript:;" class="pre_menu_link" @click="showChild({index1})">
                  <i class="icon_menu_dot js_icon_menu_dot dn"></i>
                  <i class="icon20_common sort_gray"></i>
                  <span class="js_l1Title">{{item.name}}</span>
                </a>
                <div class="sub_pre_menu_box js_l2TitleBox" v-show="item.showChild">
                  <ul class="sub_pre_menu_list">
                    <li class="jslevel2" v-for="(item2,index2) in item.childItem">
                      <a href="javascript:;" class="jsSubView" @click="childClick({index1,index2})">
                        <span class="sub_pre_menu_inner js_sub_pre_menu_inner">
                            <i class="icon20_common sort_gray"></i>
                            <span class="js_l2Title">{{item2.name}}</span>
                        </span>
                      </a>
                    </li>
                    <li class="js_addMenuBox" v-show="item.childItem.length < 5">
                      <a href="javascript:;" class="jsSubView js_addL2Btn" title="最多添加5个子菜单"
                         @click="addSecondItem()">
                        <span class="sub_pre_menu_inner js_sub_pre_menu_inner">
                            <i class="icon14_menu_add"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <i class="arrow arrow_out"></i>
                  <i class="arrow arrow_in"></i>
                </div>
              </li>
              <li class=" pre_menu_item grid_item  size1of3" v-show="firstItemLength()">
                <a href="javascript:void(0);" class="pre_menu_link js_addL1Btn" title="最多添加3个一级菜单"
                   @click="addFirstItem()">
                  <i class="icon14_menu_add"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="sort_btn_wrp"></div>
      </div>
      <div class="menu_form_area">
        <div id="js_none" class="menu_initial_tips tips_global" v-if="!menu.openSide">点击左侧菜单进行编辑操作</div>
        <div id="js_rightBox" class="portable_editor to_left" v-show="menu.openSide">
          <div class="editor_inner">
            <div class="global_mod float_layout menu_form_hd js_second_title_bar" id="MenuCon" v-if="menu.openSide">
              <div class="global_mod float_layout menu_form_hd js_second_title_bar">
                <h4 class="global_info" v-if="menu.level[1]===null">{{menu.item[menu.level[0]].name}}</h4>
                <h4 class="global_info" v-else>{{menu.item[menu.level[0]].childItem[menu.level[1]].name}}</h4>
                <div class="global_extra"><a href="javascript:void(0);" @click="dellMenu()">删除菜单</a></div>
              </div>
              <div class="menu_form_bd">
                <div class="msg_sender_tips tips_global" v-show="menu.level[1]===null">已添加子菜单，仅可设置菜单名称。</div>
                <div class="frm_control_group">
                  <label for="" class="frm_label">
                    <strong class="title js_menuTitle" v-if="menu.level[1]===null">菜单名称</strong>
                    <strong class="title js_menuTitle" v-else>子菜单名称</strong>
                  </label>

                  <div class="frm_controls">
                    <span class="frm_input_box with_counter counter_in append">
                      <input type="text" v-if="menu.level[1]===null" class="frm_input js_menu_name"
                             v-model="menu.item[menu.level[0]].name">
                      <input type="text" class="frm_input js_menu_name" v-else
                             v-model="menu.item[menu.level[0]].childItem[menu.level[1]].name">
                    </span>
                    <p class="frm_msg fail js_titleEorTips dn" style="display: none;">字数超过上限</p>
                    <p class="frm_msg fail js_titlenoTips dn" style="display: none;">请输入菜单名称</p>
                    <p class="frm_tips js_titleNolTips">字数不超过8个汉字或16个字母</p>
                  </div>
                </div>
              </div>
              <div id="SubTab" v-show="menu.level[1]!=null">
                <div class="frm_control_group">
                  <label for="" class="frm_label"><strong class="title js_menuTitle">子菜单内容</strong> </label>
                  <div class="frm_controls frm_vertical_pt">
                    <label><input type="radio" name="smenu" checked @click="tabToggle(0)">发送消息</label>
                    <label><input type="radio" name="smenu" @click="tabToggle(1)">跳转网页</label>
                    <label><input type="radio" name="smenu" @click="tabToggle(2)">其他</label>
                  </div>
                </div>
                <div class="menu_content_container">
                  <div class="menu_content url jsMain">
                    <component :is='currentView' keep-alive></component>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span class="editor_arrow_wrp">
                <i class="editor_arrow editor_arrow_out"></i>
                <i class="editor_arrow editor_arrow_in"></i>
            </span>
        </div>
      </div>
      <div class="tool_bar tc js_editBox">
        <span id="pubBt" class="btn btn_input btn_primary" style="display: inline-block;"><button>保存并发布</button></span>
        <a href="javascript:;" class="btn btn_default" id="viewBt" style="display: inline-block;">预览</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import tab0 from './components/tabs/tab0'
  import tab1 from './components/tabs/tab1'
  import tab2 from './components/tabs/tab2'
  const STORAGE_KEY = 'menu'
  export default {
    data () {
      return {
        currentView: 'tab0'
      }
    },
    components: {
      tab0: tab0,
      tab1: tab1,
      tab2: tab2
    },
    computed: {
      menu () {
        return this.$store.state.menu
      }
    },
    created() {
      let _this = this
      if (window.localStorage.getItem(STORAGE_KEY) === null) {
        axios.get('/api/menu').then(function (resolve) {
          let data = resolve.data.data
          _this.$store.commit('getData', {data})
        })
      } else {
        let data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
        _this.$store.commit('getData', {data})
      }
    },
    methods: {
      tabToggle (index) {
        this.currentView = 'tab' + index
      },
      firstItemLength () {
        // 一级菜单不能超过三个
        if (this.menu.item !== undefined) {
          return this.menu.item.length < 3
        }
      },
      ...mapMutations([
        'showChild',
        'childClick',
        'addFirstItem',
        'addSecondItem',
        'dellMenu'
      ])
    }
  }
</script>

<style>
  @import "../static/css/index2b2fad.css";
  @import "../static/css/style.css";
</style>
