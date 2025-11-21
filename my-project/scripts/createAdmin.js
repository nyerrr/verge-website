const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  // Check if admin exists
  const existing = await prisma.user.findUnique({
    where: { email: 'admin@verge.com' }
  })

  if (existing) {
    console.log('❌ Admin already exists!')
    return
  }
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@verge.com',
      password: hashedPassword,
      name: 'Admin',
      phone: '09123456789',
      userType: 'admin'
    }
  })
  
  console.log('✅ Admin created!')
  console.log('Email: admin@verge.com')
  console.log('Password: admin123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())