import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Delete existing data
  await prisma.student.deleteMany()
  await prisma.user.deleteMany()
  await prisma.school.deleteMany()

  const schools = []
  const users = []
  const students = []

  // Create 1000 schools
  for (let i = 0; i < 1000; i++) {
    const school = {
      name: faker.company.name() + ' School',
      location: faker.location.city(),
      address: faker.location.streetAddress(),
      contactEmail: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      status: faker.helpers.arrayElement(['active', 'inactive']),
    }
    schools.push(school)
  }

  console.log('Creating schools...')
  const createdSchools = await prisma.school.createMany({
    data: schools,
  })

  // Get all created schools
  const allSchools = await prisma.school.findMany()

  // For each school, create 2-5 tutors and 20-50 students
  for (const school of allSchools) {
    const numTutors = faker.number.int({ min: 2, max: 5 })
    const numStudents = faker.number.int({ min: 20, max: 50 })

    // Create tutors for this school
    const schoolTutors = Array.from({ length: numTutors }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'TUTOR' as const,
      schoolId: school.id,
      status: faker.helpers.arrayElement(['active', 'inactive']),
    }))

    console.log(`Creating ${numTutors} tutors for school ${school.id}...`)
    const createdTutors = await prisma.user.createMany({
      data: schoolTutors,
    })

    // Get all tutors for this school
    const tutors = await prisma.user.findMany({
      where: { schoolId: school.id },
    })

    // Create students and assign them to tutors
    const schoolStudents = Array.from({ length: numStudents }, () => ({
      name: faker.person.fullName(),
      classYear: faker.helpers.arrayElement(['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11']),
      readingAge: faker.number.float({ min: 8, max: 16, fractionDigits: 1 }),
      progress: faker.number.float({ min: 0, max: 3, fractionDigits: 1 }),
      schoolId: school.id,
      tutorId: tutors[faker.number.int({ min: 0, max: tutors.length - 1 })].id,
      status: faker.helpers.arrayElement(['active', 'inactive']),
    }))

    console.log(`Creating ${numStudents} students for school ${school.id}...`)
    const createdStudents = await prisma.student.createMany({
      data: schoolStudents,
    })
  }

  // Create admin user
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@tr.com',
      role: 'ADMIN',
      schoolId: allSchools[0].id, // Assign to first school
      status: 'active',
    },
  })

  console.log('Seeding finished!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })