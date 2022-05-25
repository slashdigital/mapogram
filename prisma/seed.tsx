import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const mapTypes: Prisma.MapTypeCreateInput[] = [
  {
    name: 'FIRMS Active Fire Disaster',
    layout: 'fire-disaster.layout',
  },
  // {
  //   name: 'Flood Disaster',
  //   layout: 'flood-disaster.layout',
  // },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const item of mapTypes) {
    const mapType = await prisma.mapType.create({
      data: item,
    })
    console.log(`Created map type with id: ${mapType.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
