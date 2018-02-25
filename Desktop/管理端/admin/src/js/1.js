import css from '../css/1.css';
import $ from 'jquery';
let host = "http://123.207.138.78:8888/"
//一个页面切换函数 传入什么值 当且也显示 其他页display:none; 传空全部display:none
let page = {
    all: $("#main_all"),
    add: $("#main_add"),
    search: $("#main_search")
}
page.none = function (view) {
    this.all.css({ display: "none" });
    this.add.css({ display: "none" });
    this.search.css({ display: "none" });
    if (view == 'all' || view == 'add' || view == 'search') {
        this[view].css({ display: "flex" });
    }
}
page.none();
let personpbj = function (person,str) {
    this.inf = person;
    this.dom = {};
    this.fun = {};
    this.box = this.initdom(str);
}
personpbj.prototype.initdom = function (str) {
    let box = $('<div class="person_body flex_center_r"><div class="person_bl flex_center_c"><div class="person_blt flex_center_c"><div class="person_bltt"><div><label>姓名:</label><input type="text" value="许世豪" maxlength="3" size="8" class="person_input" readonly="readonly"/></div><div><label>班级:</label><input type="text" value="计科1601" maxlength="6" size="8" class="person_input" readonly="readonly"></div><div><label>学号:</label><input type="text" value="04161028" maxlength="8" size="8" class="person_input" readonly="readonly">  </div></div><div class="person_bltb"><div><label>电话:</label><input type="text" value="18392869739" maxlength="11" size="12" class="person_input" readonly="readonly"/></div><div><label>性别</label><select name="sex" class="person_s" disabled="disabled"><option value="男">男</option><option value="女">女</option></select></div><div><label>方向</label><select name="derition" class="person_s" disabled="disabled"><option value="android">android</option><option value="ios">ios</option><option value="web">web</option><option value="jave">java后台</option></select></div></div></div><div class="person_blb"><p class="person_blbp">留言</p><textarea  class="person_message" readonly="readonly"></textarea></div></div><div class="person_br"><div class="person_brd"><p>修改</p></div><div class="person_brd"><p>删除</p></div><div class="person_brd"><select name="status" class="person_status" disabled="disabled"><option value="login">报名</option><option value="pass1">一面通过</option><option value="pass2">二面通过</option><option value="pass3">三面通过</option><option value="go">发光</option></select></div><div class="person_brd"><p>发光</p></div></div></div>')
    page[str].append(box);
    this.dom.name = $(box.find('.person_input').get(0));
    this.dom.class = $(box.find('.person_input').get(1));
    this.dom.username = $(box.find('.person_input').get(2));
    this.dom.tel = $(box.find('.person_input').get(3));
    this.dom.sex = $(box.find('.person_s').get(0));
    this.dom.direction = $(box.find('.person_s').get(1));
    this.dom.message = $(box.find('textarea').get(0));
    this.fun.updata = $(box.find('.person_brd').get(0));
    this.fun.deletes = $(box.find('.person_brd').get(1));
    this.fun.status = $(box.find('.person_brd').get(2));
    this.fun.faguang = $(box.find('.person_brd').get(3));
    this.initinf(this.inf);
    this.faevent();
    this.updataevent();
    this.deletesevent();
    console.log(this.dom, this.fun);
    return box;
}
personpbj.prototype.initinf = function (obj) {
    this.dom.name.val(obj.name);  //姓名
    this.dom.class.val(obj.class);  //班级
    this.dom.username.val(obj.username);  //学号
    this.dom.sex.val(obj.sex);  //性别
    this.dom.direction.val(obj.direction); //方向
    this.dom.message.val(obj.message); //留言
    this.dom.tel.val(obj.tel); //电话
    $(this.fun.status.find('.person_status').get(0)).val(obj.status);
}
personpbj.prototype.faevent = function () {
    let that = this
    this.fun.faguang.click(function () {
        if (that.inf.status == 'go') {
            return;
        }
        //首先是状态变化
        that.inf.status = 'go';
        //状态上传 
        $.ajax({
            url: host + 'updata',
            type: 'get',
            data: {
                adminpass: "xiyou3g2018",
                data: {
                    conditions: { username: that.inf.username },
                    new: { status: 'go' }
                }
            },
            success: function (data) {
                console.log(data)
                //dom变更
                if (!data.err) {
                    that.initinf(that.inf);
                    alert('发光成功!');
                }
            },
            fail: function () {
                console.log('fail');
            }
        })
    })
}
personpbj.prototype.updataevent = function () {
    let that = this;
    let save = function () {
        let p = $($(this).find('p').get(0));
        p.text('保存');
        that.locking('up');
        that.fun.updata.one("click", updata);
        return;
    }
    let updata = function () {
        let p = $($(this).find('p').get(0));
        that.locking('down');
        that.inf = {
            _id: that.inf._id,
            name: that.dom.name.val(),
            username: that.dom.username.val(),
            class: that.dom.class.val(),
            sex: that.dom.sex.val(),
            direction: that.dom.direction.val(),
            message: that.dom.message.val(),
            tel: that.dom.tel.val(),
            status: $(that.fun.status.find('.person_status').get(0)).val()
        }
        $.ajax({
            url: host + 'updata',
            type: 'get',
            data: {
                adminpass: "xiyou3g2018",
                data: {
                    conditions: { _id: that.inf._id },
                    new: that.inf
                }
            },
            success: function (data) {
                console.log(data);
                if (!data.err) {
                    alert('保存成功!');
                    p.text('修改');
                    that.fun.updata.one("click", save);
                }
            },
            fail: function () {
                console.log('fail');
            }
        })
        return;
    }
    this.fun.updata.one("click", save);
}
personpbj.prototype.locking = function (str) {
    if (str == 'up') {
        console.log('解锁')
        console.log(this.dom);
        this.dom.name.removeAttr('readonly');
        this.dom.class.removeAttr('readonly');
        this.dom.username.removeAttr('readonly');
        this.dom.message.removeAttr('readonly');
        this.dom.tel.removeAttr('readonly');
        this.dom.sex.removeAttr('disabled');
        this.dom.direction.removeAttr('disabled');
        $(this.fun.status.find('.person_status').get(0)).removeAttr('disabled');
    } else {
        console.log('锁定')
        this.dom.name.attr('readonly', 'readonly');
        this.dom.class.attr('readonly', 'readonly');
        this.dom.username.attr('readonly', 'readonly');
        this.dom.message.attr('readonly', 'readonly');
        this.dom.tel.attr('readonly', 'readonly');
        this.dom.sex.attr('disabled', 'disabled');
        this.dom.direction.attr('disabled', 'disabled');
        $(this.fun.status.find('.person_status').get(0)).attr('disabled', 'disabled');
    }
}
personpbj.prototype.deletesevent = function () {
    let that = this;
    this.fun.deletes.click(
        function () {
            $.ajax({
                url: host + 'delete',
                type: 'get',
                data: {
                    adminpass: "xiyou3g2018",
                    data: {
                        all: false,
                        conditions: { username: that.inf.username },
                    }
                },
                success: function (data) {
                    console.log(data);
                    if (!data.err) {
                        alert('删除成功!');
                       that.box.remove();
                    }
                },
                fail: function () {
                    console.log('fail');
                }
            })
        }
    )
}
let add = $("#addperson");
let add_back = $("#add_back");
let addperson = function () {
    page.none('add');
    let addbutton = $("#add_add");
    addbutton.click(function () {
        // 获取页面信息
        let personobj = {
            username: $("#add_num").val(),
            name: $("#add_name").val(),
            class: $("#add_class").val(),
            tel: $("#add_tel").val(),
            sex: $("#add_sex").val(),
            direction: $("#add_deriction").val(),
            message: $("#add_message").val(),
            status: "login",
            id: '1'
        }
        if (personobj.username == "") {
            alert('请输入学号!');
            return;
        } else {
            console.log(personobj);
            $.ajax({
                url: host + 'add',
                type: 'get',
                data: {
                    adminpass: "xiyou3g2018",
                    obj: personobj
                },
                success: function (data) {

                    if (!data.err) {
                        console.log(data);
                        alert('添加成功');
                        //页面置空;
                        $("#add_num").val("");
                        $("#add_name").val("");
                        $("#add_class").val("");
                        $("#add_tel").val("");
                        $("#add_sex").val("男");
                        $("#add_deriction").val("android");
                        $("#add_but").val("");
                    } else {
                        console.log(data);
                        alert('已经添加过');
                    }
                },
                fail: function () {
                    console.log('fail');
                }
            })
        }
    });
};
add.click(addperson);
add_back.click(function () {
    page.none();
});
let searchperson = function () {
    page.search.empty();
    let key = $("#search_s").val();
    let value = $("#search_t").val();
    if (!value) {
        alert('请输入查询信息!');
    } else {
        let inf = undefined;
        if (key == 'username') {
            inf = { username: value }
        } else {
            inf = { name: value }
        }
        $.ajax({
            url: host + 'find',
            type: 'get',
            data: {
                adminpass: "xiyou3g2018",
                data: {
                    all: false,
                    conditions: inf
                }
            },
            success: function (data) {
                console.log(data);
                if (!data.err) {
                    let len = data.result.length;
                    let personarr = new Array();
                    if (len >= 3) {
                        page.search.css({ 'justify-content': 'space-around', height: len * 40 + 'vh' });
                    } else{
                        page.all.css({ height:90 + 'vh' });
                    }
                    for (let i = 0; i < len; i++) {
                        personarr[i] = new personpbj(data.result[i],'search');
                    }
                    page.none('search');
                } else {
                    alert(data.errtype);
                }
            },
            fail: function () {
                console.log('fail');
            }
        })
    }
}
let search = $('#search_b');
search.click(searchperson);
let searchfun = function(str){
    page.none();
      if(str=='all')
      {
        page.all.empty();
        $.ajax({
            url: host + 'find',
            type: 'get',
            data: {
                adminpass: "xiyou3g2018",
                data: {
                    all: true,
                    conditions:'bug'
                }
            },
            success: function (data) {
                console.log(data);
                if (!data.err) {
                    let len = data.result.length;
                    let personarr = new Array();
                    if (len >= 3) {
                        page.all.css({ 'justify-content': 'space-around', height: len * 40 + 'vh' });
                    } else{
                        page.all.css({ height:90 + 'vh' });
                    }
                    for (let i = 0; i < len; i++) {
                        personarr[i] = new personpbj(data.result[i],'all');
                    }
                    page.none('all');
                    let num = $('#num').text(len);
                } else {
                    alert(data.errtype);
                }
            },
            fail: function () {
                console.log('fail');
            }
        })
      } 
      else{
        page.all.empty();
        $.ajax({
            url: host + 'find',
            type: 'get',
            data: {
                adminpass: "xiyou3g2018",
                data: {
                    all: false,
                    conditions:{direction:str}
                }
            },
            success: function (data) {
                console.log(data);
                if (!data.err) {
                    let len = data.result.length;
                    let personarr = new Array();
                    if (len >= 3) {
                        page.all.css({ 'justify-content': 'space-around', height: len * 40 + 'vh' });
                    } else{
                        page.all.css({ height:90 + 'vh' });
                    }
                    for (let i = 0; i < len; i++) {
                        personarr[i] = new personpbj(data.result[i],'all');
                    }
                    page.none('all');
                    let num = $('#num').text(len);
                } else {
                    alert(data.errtype);
                }
            },
            fail: function () {
                console.log('fail');
            }
        })
      }
}
let all = $('#header_title_p');
all.click(function(){
    searchfun('all');
})
let navs ={
    android:$('#nav_android'),
    ios:$('#nav_ios'),
    web:$('#nav_web'),
    java:$('#nav_java')
}
navs.android.click(function(){
    searchfun('android');
})
navs.ios.click(function(){
    searchfun('ios');
})
navs.web.click(function(){
    searchfun('web');
})
navs.java.click(function(){
    searchfun('java');
})
searchfun('all');
