import React, { useEffect, useState } from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import { message } from 'antd';
import { Wrap, Tip } from './style';
import isURL from 'validator/lib/isURL';
import axios from '@blog/client/admin/axios';
import useRequestLoading from '@blog/client/admin/hooks/useRequestLoading';
import EditableInput from '@blog/client/admin/components/EditableInput';
import EmailInput from './EmailInput';

const fetchConfig = () => {
    return axios.get('/configs');
};

const updateConfig = data => {
    return axios.put('/configs', data);
};

export default () => {
    const [data, setData] = useState<any>({});
    const { loading, injectRequestLoading } = useRequestLoading();

    const onFinish = values => {
        const data = values;
        if (data.siteLogo) {
            Object.assign(data, {
                siteLogo: data.siteLogo[0].url,
            });
        }
        injectRequestLoading(updateConfig(data)).then(() => {
            message.success('更新成功');
        });
    };

    useEffect(() => {
        fetchConfig().then(res => {
            setData(res.data);
        });
    }, [1]);
    return (
        <BasicLayout>
            <Wrap>
                <Tip>网站基础信息</Tip>
                <EditableInput
                    value={data.siteTitle}
                    label="网站标题"
                    name="siteTitle"
                    placeholder="请输入网站标题"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    value={data.siteDomain}
                    label="网站域名"
                    name="siteDomain"
                    placeholder="请输入网站域名"
                    loading={loading}
                    onFinish={onFinish}
                    rules={[
                        {
                            validator: (rule, value) => {
                                if (isURL(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('请输入正确的网站域名，如http(s)://www.baidu.com');
                            },
                        },
                    ]}
                ></EditableInput>
                <EditableInput
                    value={data.siteIcp}
                    label="网站备案icp"
                    name="siteIcp"
                    placeholder="请输入备案icp"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    type="upload"
                    value={data.siteLogo}
                    label="网站LOGO"
                    name="siteLogo"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <Tip>网站 META 配置</Tip>
                <EditableInput
                    type="textarea"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    value={data.siteMetaKeyWords}
                    label="META keywords"
                    name="siteMetaKeyWords"
                    placeholder="请输入keywords"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <EditableInput
                    type="textarea"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    value={data.siteMetaDescription}
                    label="META 描述"
                    name="siteMetaDescription"
                    placeholder="请输入描述"
                    loading={loading}
                    onFinish={onFinish}
                ></EditableInput>
                <Tip>网站邮箱服务通知配置</Tip>
                <EmailInput data={data}></EmailInput>
            </Wrap>
        </BasicLayout>
    );
};
