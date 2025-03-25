import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [userLevel, setUserLevel] = useState(1);
  const [userExp, setUserExp] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>Open Chemistry Project - 开放化学项目</title>
        <meta name="description" content="一个开放的化学主题资源知识库" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">欢迎回来，学习者！</h2>
              <div className="mt-2">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-blue-600">Level {userLevel}</span>
                  <div className="w-48 h-2 bg-gray-200 rounded-full mx-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(userExp / 100) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{userExp}/100 XP</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Link href="/profile">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  个人中心
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 学习路径 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">学习路径</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: '基础化学',
                description: '从原子结构开始，掌握化学基础知识',
                icon: '🧪',
                level: 1,
              },
              {
                title: '有机化学',
                description: '探索碳基化合物的世界',
                icon: '⚛️',
                level: 5,
              },
              {
                title: '物理化学',
                description: '研究化学过程中的能量变化',
                icon: '⚡',
                level: 10,
              },
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{path.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-4">{path.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Level {path.level}</span>
                  <Link href={`/learning-path/${path.title.toLowerCase()}`}>
                    <button
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        userLevel >= path.level
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={userLevel < path.level}
                    >
                      {userLevel >= path.level ? '开始学习' : '需要等级 ' + path.level}
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 知识图谱 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">知识图谱</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 h-96">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">知识图谱加载中...</p>
            </div>
          </div>
        </section>

        {/* 最近学习 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">最近学习</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: '原子结构',
                progress: 75,
                lastAccessed: '2小时前',
              },
              {
                title: '化学键',
                progress: 45,
                lastAccessed: '1天前',
              },
              {
                title: '化学反应',
                progress: 30,
                lastAccessed: '2天前',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>进度: {item.progress}%</span>
                  <span>上次访问: {item.lastAccessed}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 