const { v4: uuidv4 } = require('uuid');

// 内存存储（生产环境用数据库）
let users = [];

module.exports = async (req, res) => {
  // CORS设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: '方法不允许' });
  }

  try {
    const { email, password } = req.body;
    
    // 验证输入
    if (!email || !password) {
      return res.status(400).json({ message: '邮箱和密码不能为空' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: '密码至少6位' });
    }
    
    // 检查用户是否已存在
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: '邮箱已被注册' });
    }
    
    // 创建用户
    const user = {
      id: uuidv4(),
      email: email,
      password: password,
      isVerified: false,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    console.log('新用户注册:', user.email);
    
    // 返回成功
    return res.status(201).json({ 
      success: true,
      message: '注册成功！',
      userId: user.id,
      email: user.email
    });
    
  } catch (error) {
    console.error('注册错误:', error);
    return res.status(500).json({ 
      success: false,
      message: '服务器错误: ' + error.message 
    });
  }
};