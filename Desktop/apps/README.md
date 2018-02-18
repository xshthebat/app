# 纳新网站api
### host:http://123.207.138.78:8888/ (支持cookie,cros和jsonp跨域)
默认返回```{"err":true,"errtype":"don't has api"}``` json文件
### 1. 验证码：host/getverCode（附加当前页面状态判断） 默认带cookie
####参数:无
####返回：
1. 已登陆但未报名会返回
```
{
    err: false,
    obj: {
            type: 'it has access',
            inf: 从教务系统爬取的教务信息
         }
}
```
2. 已报名
```
{
    err: false, 
    obj: {
            type: 'it has login',
            inf: 从数据库调取的报名信息
         }
}
```
3. 含有多余参数
```
{ err: true, errtype: 'get vercode too mary params' }
```
4. 正常获取验证码
```
{"err":false,"result":{"session":验证码的session之后登陆需要用到,"src":一段base64编码可直接赋给 src}}
```
### 2. /getinformation 获取信息 登陆
####参数:name:学号 password:姓名 session:验证码所带session vercode:验证码
返回:
####返回
1. 参数不够
```
{ err: true, errtype: 'get info no params' } //没有一个参数
{ err: true, errtype: 'Please check the number and type of the parameters' }  //参数数目和个数出错
```
2.教务系统出错 无法爬取到网站
```
{
     err: true,
     errtype: "don't get info by default2.aspx"
}
```
3.不能爬取信息
```
{
     err: true,
     errtype: "can't get info by xs_main.aspx",
 }
```
4.session超时
```
{
     err: true,
     errtype: "session is out",
}
```
5.一切都正常 但是无法爬取到个人信息的主页(一般是没有评教)
```
{
     err: true,
     errtype:"not Teaching evaluation||please check your Educational administration system"
}
```
6.爬取成功
```
{
    err: false,
    result: {
           state: 'access', //登陆验证成功
           stateobj:{
           username:学号，
           name:姓名，
           class:班级，
           sex:性别
           }
    }
}
```

### 3./login 报名
#### 参数 1. username：学号 2.name姓名 3. class班级 4.direction方向 5.tel电话 6.message 留言 7.sex:性别
#### 返回值
1.没有参数或者参数不够
```
{ err: true, errtype: 'please check parameters' }
```
2.session中没有信息
```
{ err: true, errtype: 'no session' }
```
2.没有session
```
{ err: true, errtype: 'please check session' }
```
3.参数错误 
```
{ err: true, errtype: 'parameters err' } //报名信息和session中保存的爬取教务信息不符
```
4.报名成功
```
{ err: false, errtype: 'login success!' }
```
5.报名失败
```
{ err: true, errtype: 'login error!' }
```
6.已经报名
```
{ err: true, errtype: 'it has login' }
```
7.未登陆
```
{ err: true, errtype: 'not access' } 
```