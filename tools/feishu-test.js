const axios = require('axios');
require('dotenv').config();

// Feishu API endpoints
const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis';
const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;
const FEISHU_BITABLE_ID = process.env.FEISHU_BITABLE_ID;
const FEISHU_TABLE_ID = process.env.FEISHU_TABLE_ID;

// Log configuration (without sensitive data)
console.log('Configuration:');
console.log('FEISHU_APP_ID:', FEISHU_APP_ID ? '已设置' : '未设置');
console.log('FEISHU_APP_SECRET:', FEISHU_APP_SECRET ? '已设置' : '未设置');
console.log('FEISHU_BITABLE_ID:', FEISHU_BITABLE_ID ? '已设置' : '未设置');
console.log('FEISHU_TABLE_ID:', FEISHU_TABLE_ID ? '已设置' : '未设置');

async function getUserAccessToken(code) {
    try {
        // 首先获取 app_access_token
        const appTokenResponse = await axios.post(`${FEISHU_API_BASE}/auth/v3/app_access_token/internal`, {
            app_id: FEISHU_APP_ID,
            app_secret: FEISHU_APP_SECRET
        });
        const appAccessToken = appTokenResponse.data.app_access_token;
        
        // 使用 code 获取 user_access_token
        const response = await axios.post(
            `${FEISHU_API_BASE}/authen/v1/access_token`,
            { grant_type: "authorization_code", code },
            {
                headers: {
                    'Authorization': `Bearer ${appAccessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('获取用户访问令牌成功');
        return response.data.data.access_token;
    } catch (error) {
        console.error('获取用户访问令牌失败:', error.response ? {
            status: error.response.status,
            data: error.response.data
        } : error.message);
        throw error;
    }
}

async function createBitable(userAccessToken) {
    try {
        const response = await axios.post(
            `${FEISHU_API_BASE}/bitable/v1/apps`,
            {
                name: "化学知识库数据表",
                folder_token: "" // 留空表示创建在根目录
            },
            {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('创建多维表格成功:', response.data);
        return response.data.data.app;
    } catch (error) {
        console.error('创建多维表格失败:', error.response ? {
            status: error.response.status,
            data: error.response.data
        } : error.message);
        throw error;
    }
}

async function createTable(appToken, userAccessToken) {
    try {
        const response = await axios.post(
            `${FEISHU_API_BASE}/bitable/v1/apps/${appToken}/tables`,
            {
                name: "化学元素表",
                fields: [
                    {
                        field_name: "元素名称",
                        type: 1 // 文本类型
                    },
                    {
                        field_name: "原子序数",
                        type: 2 // 数字类型
                    },
                    {
                        field_name: "化学符号",
                        type: 1 // 文本类型
                    },
                    {
                        field_name: "原子量",
                        type: 2 // 数字类型
                    },
                    {
                        field_name: "分类",
                        type: 1 // 文本类型
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('创建数据表成功:', response.data);
        return response.data.data.table;
    } catch (error) {
        console.error('创建数据表失败:', error.response ? {
            status: error.response.status,
            data: error.response.data
        } : error.message);
        throw error;
    }
}

// Test the integration
async function testFeishuIntegration(authCode) {
    if (!authCode) {
        console.log('请提供用户授权码（code）。获取方式：');
        console.log('1. 在飞书开放平台配置重定向URL');
        console.log('2. 在浏览器中访问授权URL：');
        console.log(`https://open.feishu.cn/open-apis/authen/v1/index?app_id=${FEISHU_APP_ID}&redirect_uri=YOUR_REDIRECT_URI`);
        console.log('3. 完成授权后，从重定向URL中获取code参数');
        return;
    }

    try {
        console.log('开始测试飞书集成...');
        
        // 获取用户访问令牌
        console.log('正在获取用户访问令牌...');
        const userAccessToken = await getUserAccessToken(authCode);
        
        // 创建多维表格
        console.log('正在创建多维表格...');
        const bitable = await createBitable(userAccessToken);
        console.log('多维表格ID:', bitable.app_token);
        
        // 创建数据表
        console.log('正在创建数据表...');
        const table = await createTable(bitable.app_token, userAccessToken);
        console.log('数据表ID:', table.table_id);
        
        console.log('测试完成！');
        console.log('\n请将以下信息更新到 .env 文件中：');
        console.log(`FEISHU_BITABLE_ID=${bitable.app_token}`);
        console.log(`FEISHU_TABLE_ID=${table.table_id}`);
        
    } catch (error) {
        console.error('测试失败:', error.message);
    }
}

// 从命令行参数获取授权码
const authCode = process.argv[2];
testFeishuIntegration(authCode); 