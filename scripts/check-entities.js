require('dotenv').config();  // 自动加载 .env 文件
const { execSync } = require('child_process');

try {
  // 检查环境变量是否存在
  const requiredEnvVars = [
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USER',
    'DATABASE_PASSWORD',
    'DATABASE_NAME'
  ];

  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    console.error('缺少必要的环境变量:', missingEnvVars.join(', '));
    console.error('请确保 .env 文件存在并包含所需的数据库配置');
    process.exit(1);
  }

  // 检查是否有实体文件改动
  const changedFiles = execSync('git diff --cached --name-only').toString();
  const hasEntityChanges = changedFiles.split('\n').some(file => file.endsWith('entity.ts'));
  
  if (hasEntityChanges) {
    console.log('检测到实体文件变更，正在生成迁移文件...');
    execSync('pnpm run generate-migration', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development'  // 确保在开发环境下运行
      }
    });
  } else {
    console.log('没有实体文件变更，跳过迁移生成');
  }
} catch (error) {
  console.error('处理迁移时发生错误:', error);
  process.exit(1);
}