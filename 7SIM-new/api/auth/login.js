// 共享用户数据
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
      return res.status(400).json({ 
        success: false,
        message: '邮箱和密码不能为空' 
      });
    }
    
    // 查找用户
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: '邮箱或密码错误' 
      });
    }
    
    console.log('用户登录:', user.email);
    
    // 登录成功
    return res.status(200).json({ 
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified
      }
    });
    
  } catch (error) {
    console.error('登录错误:', error);
    return res.status(500).json({ 
      success: false,
      message: '服务器错误: ' + error.message 
    });
  }
};