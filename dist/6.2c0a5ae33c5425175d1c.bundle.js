(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{534:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return x});a(66);var o=a(41),r=(a(528),a(532)),l=(a(530),a(12)),c=(a(67),a(40)),s=(a(32),a(8)),u=(a(43),a(20)),n=(a(484),a(483)),f=a(0),p=a.n(f),d=a(10),i=a(29),m=a.n(i),h=a(34),b=a(472),y=a.n(b);function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),n.forEach(function(e){w(t,e,a[e])})}return t}function w(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function E(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function k(e,t){return!t||"object"!==g(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var C=n.a.Dragger,N={name:"file",multiple:!0,action:"/api/upload/static-files",onChange:function(e){var t=e.file.status;"uploading"!==t&&console.log(e.file,e.fileList),"done"===t?u.a.success("".concat(e.file.name," file uploaded successfully.")):"error"===t&&u.a.error("".concat(e.file.name," file upload failed."))}},x=function(e){function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=k(this,O(a).call(this,e))).state={files:[],visible:!1,pagination:{},loading:!1,clipboard:null},t}var t,n,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(a,f["Component"]),t=a,(n=[{key:"getTableColums",value:function(){var a=this;return[{title:"原始文件名",dataIndex:"originalName"},{title:"文件名",dataIndex:"fileName"},{title:"创建时间",dataIndex:"createdAt",render:function(e,t){return Object(h.a)(t.createdAt,"YYYY-MM-DD")}},{title:"文件类型",dataIndex:"mimetype",width:160},{title:"文件大小",dataIndex:"size",render:function(e,t){return(t.size/1024).toFixed(1)+"k"}},{title:"文件路径",dataIndex:"filePath"},{title:"操作",key:"operation",width:200,render:function(e,t){return p.a.createElement("div",null,p.a.createElement(s.a,{type:"primary",size:"small",title:"复制","data-clipboard-text":t.filePath+t.fileName,className:"btnCopy"},"复制url"),",",p.a.createElement(c.a,{title:"确认要删除？",onConfirm:function(){return a.deleteFile(t._id)},okText:"确定",cancelText:"取消"},p.a.createElement(s.a,{type:"danger",size:"small",title:"删除"},p.a.createElement("i",{className:"fa fa-trash-o fa-fw"}),"删除")))}}]}},{key:"deleteFile",value:function(e){var t=this;d.a.delete("/files/"+e).then(function(){u.a.success("删除文件成功"),t.fetchData()})}},{key:"fetchData",value:function(){var n=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:10;this.setState({loading:!0});var a={limit:t,page:e};return d.a.get("/files?"+m.a.stringify(a)).then(function(e){var t=JSON.parse(e.headers["x-paging"]),a=v({},n.state.pagination);a.total=t.total,console.log(t.total),n.setState({files:e.data,loading:!1,pagination:a})})}},{key:"handleOk",value:function(){var e=this;return this.fetchData(this.props.location).then(function(){e.setState({visible:!1})})}},{key:"handleTableChange",value:function(e){var t=v({},this.state.pagination);console.log(e),t.current=e.current,this.setState({pagination:t}),this.fetchData(e.current,e.pageSize)}},{key:"componentDidMount",value:function(){var e=new y.a(".btnCopy");this.setState({clipboard:e}),e.on("success",function(e){u.a.success("复制链接成功")}),this.fetchData()}},{key:"componentWillUnmount",value:function(){this.state.clipboard.destroy()}},{key:"render",value:function(){var t=this,e={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.key,name:e.name}}};return p.a.createElement("div",{className:"main-content"},p.a.createElement("div",{className:"manager-tip"},p.a.createElement("i",{className:"fa fa-edit fa-fw"}),p.a.createElement("strong",null,"控制台----静态文件管理")),p.a.createElement("div",{className:"panel"},p.a.createElement(s.a,{type:"primary",onClick:function(){return t.setState({visible:!0})}},p.a.createElement("i",{className:"fa fa-plus-square fa-fw"}," "),"添加静态文件"),p.a.createElement(s.a,{type:"danger"},p.a.createElement("i",{className:"fa fa-fw fa-trash-o fa-fw"}," "),"批量删除")),p.a.createElement(r.a,{title:"上传静态文件",visible:this.state.visible,onOk:function(){return t.handleOk()},onCancel:function(){return t.setState({visible:!1})}},p.a.createElement(C,N,p.a.createElement("p",{className:"ant-upload-drag-icon"},p.a.createElement(l.a,{type:"inbox"})),p.a.createElement("p",{className:"ant-upload-text"},"Click or drag file to this area to upload"),p.a.createElement("p",{className:"ant-upload-hint"},"Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files"))),p.a.createElement("div",{className:"table-wrapper"},p.a.createElement(o.a,{rowKey:function(e){return e._id},rowSelection:e,columns:this.getTableColums(),dataSource:this.state.files,pagination:this.state.pagination,loading:this.state.loading,onChange:function(e){return t.handleTableChange(e)}})))}}])&&E(t.prototype,n),i&&E(t,i),a}()}}]);