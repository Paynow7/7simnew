const fs = require('fs');

console.log('🔧 7SIM项目构建开始...');

// 检查文件结构
console.log('📁 文件结构检查:');
try {
  const files = fs.readdirSync('.');
  console.log('根目录文件:', files);
  
  const apiFiles = fs.readdirSync('./api');
  console.log('API目录:', apiFiles);
  
  const authFiles = fs.readdirSync('./api/auth');
  console.log('Auth目录:', authFiles);
  
  const publicFiles = fs.readdirSync('./public');
  console.log('Public目录:', publicFiles);
  
  console.log('✅ 文件结构正常');
} catch (error) {
  console.error('❌ 文件结构错误:', error);
}

console.log('🎉 构建完成');
