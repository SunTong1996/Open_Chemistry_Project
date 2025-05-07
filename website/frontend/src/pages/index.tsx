import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ElectrodePotentialPage from './ElectrodePotentialPage';

export { ElectrodePotentialPage };

export default function Home() {
  const features = [
    {
      title: '元素周期表',
      description: '交互式元素周期表，包含详细的元素信息和电子排布可视化',
      link: '/periodic-table',
      icon: '⚛️',
    },
    {
      title: '化学概念图谱',
      description: '化学概念之间的关系可视化，帮助理解知识结构',
      link: '/knowledge-graph',
      icon: '🔬',
    },
    {
      title: '化学反应模拟',
      description: '常见化学反应的动态模拟演示（开发中）',
      link: '#',
      icon: '🧪',
    },
    {
      title: '化学习题库',
      description: '包含各种化学习题和解答（开发中）',
      link: '#',
      icon: '📝',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>开放化学项目</title>
        <meta name="description" content="开放化学项目 - 综合化学知识库" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            开放化学项目
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            一个综合性的化学知识库，为学习、研究和教学提供开放资源
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link href={feature.link} className="text-blue-500 hover:text-blue-700 font-medium">
                {feature.link === '#' ? '即将推出' : '立即访问'} →
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">项目目标</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '提供高质量的化学教育资源',
              '建立完整的化学物质数据库',
              '分享化学科普内容',
              '促进化学知识的开放共享',
            ].map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-blue-50 text-blue-800 px-4 py-2 rounded-full"
              >
                {goal}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} 开放化学项目 | 使用 MIT 许可证</p>
        </div>
      </footer>
    </div>
  );
}