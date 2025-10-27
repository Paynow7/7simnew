// 共享用户数据
let users = [];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ 
      success: false,
      message: '验证令牌无效' 
    });
  }
  
  // 这里应该是真实的验证逻辑
  // 暂时模拟验证成功
  return res.status(200).json({
    success: true,
    message: '邮箱验证成功'
  });
};