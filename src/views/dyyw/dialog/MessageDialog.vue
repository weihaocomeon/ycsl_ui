<template>
    <el-dialog width="80%" title="房产信息搜索" :visible.sync="messageDialogVisible" :before-close="handleClose" append-to-body>
        <!-- 搜索条件 -->
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" style="padding-left: 50px">
            <el-form-item label="搜索条件">
                <el-select v-model="choseSearchTerm" placeholder="请选择搜索条件">
                    <el-option label="不动产单元号" value="1"></el-option>
                    <el-option label="相关证号" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-show="choseSearchTerm=='1'" v-model="searchForm.bdcdyh" placeholder="请输入不动产单元号"></el-input>
                <el-input v-show="choseSearchTerm=='2'" v-model="searchForm.xgzh" placeholder="请输入相关证号"></el-input>
            </el-form-item>
            <el-form-item v-show="choseSearchTerm=='1'">
                <el-button type="text" @click="scanForBdcdyh">扫码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="text" @click="clearData">清空</el-button>
            </el-form-item>
        </el-form>
        <!-- 不同状态房屋的表格显示不同颜色的 -->
        <span style="background-color: #ff8000;font-size:18px;"><b>抵押</b></span>
        <span style="background-color: #ff0000;font-size:18px;"><b>查封</b></span>
        <span style="background-color: #80ffff;font-size:18px;"><b>异议</b></span>
        <span style="background-color: #ff00ff;font-size:18px;"><b>地议</b></span>
        <span style="background-color: #808080;font-size:18px;"><b>抵押和查封</b></span>
        <!-- 搜索结果展示吗，以供选择 -->
        <el-table ref="multipleTable" :data="messageData" :row-class-name="tableRowClassName" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align='center' label='不动产单元号'>
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.bdcdyh}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='不动产证号' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.bdczh}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='户编号' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.hbh}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='幢编号' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.zbh}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='户号' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.hh}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='坐落' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.zl}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='房间号' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.fjh}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='单元号' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.dyh}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='项目名称' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.xmmc}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='建筑面积' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.jzmj}}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' label='建筑名称' >
                <template slot-scope='scope'>
                <span>{{scope.row.fwData.jzmc}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px" align="right">
            <el-button type="primary" @click="handleClose">取消</el-button>
            <el-button type="primary" @click="choseData">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:['messageDialogVisible'],
    data(){
        return{
            searchForm:{ //搜索框
                bdcdyh:'',
                xgzh:'',
            },
            choseSearchTerm:'',//搜索条件
            messageData:[],//相关信息数据
            trueMessageData:{},//真实的数据信息
        }   
    },
    methods:{
        //搜索相关信息
        search(){
            this.messageData = [{
                fwzt:'1',
                fwData:{
                    bdcdyh:'320300',
                    bdczh:'徐房权证（2019）字第097898号',
                    hbh:'0001',
                    zbh:'0001',
                    hh:'0001',
                    zl:'泉山区',
                    fjh:'301-1',
                    dyh:'3203000001',
                    xmmc:'泉山项目',
                    jzmj:'100',
                    jzmc:'住宅'
                },
                qlrs:[{
                    qlrmc:'张三',
                    zjlx:'身份证',
                    zjhm:'320300198702052865',
                    gyfs:'共同共有',
                    gyfe:'50%',
                },{
                    qlrmc:'里斯',
                    zjlx:'身份证',
                    zjhm:'320300198702052866',
                    gyfs:'共同共有',
                    gyfe:'50%',
                }],
                mfs:[{
                    mfrmc:'哈姆',
                    zjlx:'身份证',
                    zjhm:'320300198702052867',
                },{
                    mfrmc:'金牌',
                    zjlx:'身份证',
                    zjhm:'320300198702052868',
                }],
                dys:[{
                    dyzmh:'抵押098999号',
                    djlx:'全款抵押',
                    xgzh:'徐房权证（2019）字第097898号',
                    djyy:'无',
                    dyqrs:[{
                        dyqrmc:'卡威普',
                        zjlx:'身份证',
                        zjhm:'320300198702052879',
                        lxdh:'18239076553'
                    },{
                        dyqrmc:'老会计',
                        zjlx:'身份证',
                        zjhm:'320300198702052870',
                        lxdh:'18239076554'
                    }]
                },{
                    dyzmh:'抵押098990号',
                    djlx:'贷款抵押',
                    xgzh:'徐房权证（2019）字第097898号',
                    djyy:'无',
                    dyqrs:[{
                        dyqrmc:'卡皮',
                        zjlx:'身份证',
                        zjhm:'320300198702052879',
                        lxdh:'18239076553'
                    },{
                        dyqrmc:'未完工',
                        zjlx:'身份证',
                        zjhm:'320300198702052870',
                        lxdh:'18239076554'
                    }]
                }]
            },{
                fwzt:'2',
                fwData:{
                    bdcdyh:'320301',
                    bdczh:'徐房权证（2019）字第097899号',
                    hbh:'0001',
                    zbh:'0001',
                    hh:'0001',
                    zl:'泉山区',
                    fjh:'301-1',
                    dyh:'3203000001',
                    xmmc:'泉山项目',
                    jzmj:'100',
                    jzmc:'住宅'
                },
                qlrs:[{
                    qlrmc:'微软',
                    zjlx:'身份证',
                    zjhm:'320300198702052865',
                    gyfs:'共同共有',
                    gyfe:'50%',
                },{
                    qlrmc:'天涯',
                    zjlx:'身份证',
                    zjhm:'320300198702052866',
                    gyfs:'共同共有',
                    gyfe:'50%',
                }],
                mfs:[{
                    mfrmc:'前往',
                    zjlx:'身份证',
                    zjhm:'320300198702052867',
                },{
                    mfrmc:'六国',
                    zjlx:'身份证',
                    zjhm:'320300198702052868',
                }],
                dys:[{
                    dyzmh:'抵押098990号',
                    djlx:'全款抵押',
                    xgzh:'徐房权证（2019）字第097899号',
                    djyy:'无',
                    dyqrs:[{
                        dyqrmc:'十五日',
                        zjlx:'身份证',
                        zjhm:'320300198702052879',
                        lxdh:'18239076553'
                    },{
                        dyqrmc:'体育',
                        zjlx:'身份证',
                        zjhm:'320300198702052870',
                        lxdh:'18239076554'
                    }]
                },{
                    dyzmh:'抵押098990号',
                    djlx:'贷款抵押',
                    xgzh:'徐房权证（2019）字第097899号',
                    djyy:'无',
                    dyqrs:[{
                        dyqrmc:'欧派',
                        zjlx:'身份证',
                        zjhm:'320300198702052879',
                        lxdh:'18239076553'
                    },{
                        dyqrmc:'濮阳',
                        zjlx:'身份证',
                        zjhm:'320300198702052870',
                        lxdh:'18239076554'
                    }]
                }]
            },{
                fwzt:'',
                fwData:{
                    bdcdyh:'320302',
                    bdczh:'徐房权证（2019）字第097891号',
                    hbh:'0001',
                    zbh:'0001',
                    hh:'0001',
                    zl:'泉山区',
                    fjh:'301-1',
                    dyh:'3203000001',
                    xmmc:'泉山项目',
                    jzmj:'100',
                    jzmc:'住宅'
                },
                qlrs:[{
                    qlrmc:'温柔',
                    zjlx:'身份证',
                    zjhm:'320300198702052865',
                    gyfs:'共同共有',
                    gyfe:'50%',
                },{
                    qlrmc:'用途',
                    zjlx:'身份证',
                    zjhm:'320300198702052866',
                    gyfs:'共同共有',
                    gyfe:'50%',
                }],
                mfs:[{
                    mfrmc:'皮营',
                    zjlx:'身份证',
                    zjhm:'320300198702052867',
                },{
                    mfrmc:'呃呃',
                    zjlx:'身份证',
                    zjhm:'320300198702052868',
                }],
                dys:[{
                    dyzmh:'抵押098999号',
                    djlx:'全款抵押',
                    xgzh:'徐房权证（2019）字第097891号',
                    djyy:'无',
                    dyqrs:[{
                        dyqrmc:'热议',
                        zjlx:'身份证',
                        zjhm:'320300198702052879',
                        lxdh:'18239076553'
                    },{
                        dyqrmc:'就额',
                        zjlx:'身份证',
                        zjhm:'320300198702052870',
                        lxdh:'18239076554'
                    }]
                },{
                    dyzmh:'抵押098990号',
                    djlx:'贷款抵押',
                    xgzh:'徐房权证（2019）字第097891号',
                    djyy:'无',
                    dyqrs:[{
                        dyqrmc:'企鹅',
                        zjlx:'身份证',
                        zjhm:'320300198702052879',
                        lxdh:'18239076553'
                    },{
                        dyqrmc:'法师',
                        zjlx:'身份证',
                        zjhm:'320300198702052870',
                        lxdh:'18239076554'
                    }]
                }]
            }];
        },
        //清空搜索条件与搜索出的数据
        clearData(){
            this.searchForm={
                bdcdyh:'',
                xgzh:'',
            };
            this.messageData = [];
        },
        //确定行颜色
        tableRowClassName({row, rowIndex}) {
            if (row.fwzt == '1') {
                return 'DYColour';
            } else if (row.fwzt == '2') {
                return 'CFColour';
            } else if (row.fwzt == '3') {
                return 'YYColour';
            } else if (row.fwzt == '4') {
                return 'DYYColour';
            } else if (row.fwzt == '5') {
                return 'DYACFColour';
            }
            return '';
        },
        //切换选择操作触发
        handleSelectionChange(val) {
            this.trueMessageData = val[0]
        },
        //选取需要的数据信息
        choseData() {
            this.$emit('pushToFather',this.trueMessageData)
        },
        //关闭Dialog之前触发
        handleClose(){
            this.$emit('closeDialog')
        },
        //扫码获取不动产单元号
        scanForBdcdyh(){
            this.searchForm.bdcdyh='320300'
        }
    },
}
</script>
<style>
.el-table .DYColour{
    background: #ff8000;
}
.el-table .CFColour{
    background: #ff0000;
}
.el-table .YYColour{
    background: #80ffff;
}
.el-table .DYYColour{
    background: #ff00ff;
}
.el-table .DYACFColour{
    background: #808080;
}
</style>

