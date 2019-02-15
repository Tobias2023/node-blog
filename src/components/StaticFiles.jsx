import React, { Component } from 'react';
import axios from '../utils/axios';
import queryString from 'query-string';
import { parseTime } from '../utils/time';
import Clipboard from 'clipboard';
import { Table, Button, Popconfirm, message, Upload, Icon, Modal } from 'antd';
const Dragger = Upload.Dragger;

const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload/static-files',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            visible: false,
            pagination: {},
            loading: false,
            clipboard: null
        };
    }
    getTableColums() {
        return [
            {
                title: '原始文件名',
                dataIndex: 'originalName'
            },
            {
                title: '文件名',
                dataIndex: 'fileName'
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (text, record) => (parseTime(record.createdAt, 'YYYY-MM-DD'))
            }, {
                title: '文件类型',
                dataIndex: 'mimetype',
                width: 160,
            }, {
                title: '文件大小',
                dataIndex: 'size',
                render: (text, record) => ((record.size / 1024).toFixed(1) + 'k')
            }, {
                title: '文件路径',
                dataIndex: 'filePath'
            }, {
                title: '操作',
                key: 'operation',
                width: 200,
                render: (text, record) => (
                    <div>
                        <Button
                            type="primary"
                            size="small"
                            title="复制"
                            data-clipboard-text={record.filePath + '/' + record.fileName}
                            className="btnCopy"
                        >
                            复制url
                        </Button>,
                        <Popconfirm title="确认要删除？" onConfirm={() => this.deleteFile(record._id)} okText="确定" cancelText="取消">
                            <Button
                                type="danger"
                                size="small"
                                title="删除">
                                <i className="fa fa-trash-o fa-fw"></i>删除
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        ];
    }
    deleteFile(_id) {
        axios.delete('/files/' + _id).then(() => {
            message.success("删除文件成功");
            this.fetchData();
        });
    }
    fetchData(page = 1, limit = 10) {
        this.setState({ loading: true });
        const query = {
            limit,
            page
        };
        return axios
            .get('/files?' + queryString.stringify(query))
            .then((res) => {
                const paging = JSON.parse(res.headers['x-paging']);
                const pagination = { ...this.state.pagination };
                pagination.total = paging.total;
                console.log(paging.total);
                this.setState({
                    files: res.data,
                    loading: false,
                    pagination,
                });
            });
    }
    handleOk() {
        return this.fetchData(this.props.location).then(() => {
            this.setState({
                visible: false,
            });
        });
    }
    handleTableChange(pagination) {
        const pager = { ...this.state.pagination };
        console.log(pagination);
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchData(pagination.current, pagination.pageSize);
    }
    componentDidMount() {
        const c = new Clipboard('.btnCopy');
        this.setState({
            clipboard: c
        });
        c.on('success', function (e) {
            message.success("复制链接成功");
        });
        this.fetchData();
    }
    componentWillUnmount() {
        this.state.clipboard.destroy();
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.key === 'Disabled User',
                name: record.name,
            }),
        };
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----静态文件管理</strong>
                </div>
                <div className="panel">
                    <Button
                        type="primary"
                        onClick={() => this.setState({ visible: true })}>
                        <i className="fa fa-plus-square fa-fw">&nbsp;</i>
                        添加静态文件
                    </Button>
                    <Button
                        type="danger">
                        <i className="fa fa-fw fa-trash-o fa-fw">&nbsp;</i>
                        批量删除
                    </Button>
                </div>
                <Modal
                    title="上传静态文件"
                    visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                >
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>
                </Modal>
                <div className="table-wrapper">
                    <Table
                        rowKey={record => record._id}
                        rowSelection={rowSelection}
                        columns={this.getTableColums()}
                        dataSource={this.state.files}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={(pagination) => this.handleTableChange(pagination)}
                    />
                </div>
            </div>
        );
    }
}