const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@verge.com',
      password: hashedPassword,
      name: 'Admin',
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