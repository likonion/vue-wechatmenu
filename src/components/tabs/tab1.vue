<template>
  <form action="" onsubmit="return false;">
    <p class="menu_content_tips tips_global">订阅者点击该子菜单会跳到以下链接</p>
    <div class="frm_control_group">
      <label for="" class="frm_label">页面地址</label>
      <div class="frm_controls">
                          <span class="frm_input_box disabled">
                            <input type="text" class="frm_input" name="urlText">
                          </span>
      </div>
    </div>
    <div class="frm_control_group btn_appmsg_wrap">
      <div class="frm_controls">
        <p class="frm_msg fail dn" style="display: none;">
          <span for="urlText" class="frm_msg_content" style="display: inline;">请选择一篇文章</span>
          <a href="javascript:;">从公众号图文消息中选择</a>
          <a href="javascript:void(0);" class="dn btn btn_default" style="display: none;">重新选择</a>
        </p>
      </div>
    </div>
  </form>
</template>

