import { PrismaClient } from '@prisma/client';
import { decryptData, encryptData } from '../src/middleware/encryptionMiddleware';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🟢 Populando o banco de dados...");

  // 🔐 Criando senhas seguras
  const hashedPassword = await bcrypt.hash('123456', 10);

  // 🔹 Criando Usuários
  const users = await prisma.user.createMany({
    data: [
      { email: "ana.silva@gmail.com", password: hashedPassword, name: "Ana Silva" },
      { email: "carlos.souza@gmail.com", password: hashedPassword, name: "Carlos Souza" },
      { email: "fernanda.lima@gmail.com", password: hashedPassword, name: "Fernanda Lima" },
      { email: "joao.pereira@gmail.com", password: hashedPassword, name: "João Pereira" },
      { email: "maria.oliveira@gmail.com", password: hashedPassword, name: "Maria Oliveira" },
      { email: "lucas.martins@gmail.com", password: hashedPassword, name: "Lucas Martins" },
      { email: "camila.rodrigues@gmail.com", password: hashedPassword, name: "Camila Rodrigues" },
      { email: "rafael.ferreira@gmail.com", password: hashedPassword, name: "Rafael Ferreira" },
      { email: "isabela.moura@gmail.com", password: hashedPassword, name: "Isabela Moura" },
      { email: "pedro.alves@gmail.com", password: hashedPassword, name: "Pedro Alves" },
    ],
  });

  console.log("✅ Usuários criados!");

  // 🔹 Criando Supervisores
  const supervisors = await prisma.supervisor.createMany({
    data: [
      { email: "dr.julio@gmail.com", password: hashedPassword, name: "Dr. Júlio Mendes" },
      { email: "dr.clara@gmail.com", password: hashedPassword, name: "Dra. Clara Batista" },
      { email: "dr.renato@gmail.com", password: hashedPassword, name: "Dr. Renato Lima" },
    ],
  });

  console.log("✅ Supervisores criados!");

  // 🔹 Pegando IDs dos usuários criados
  const allUsers = await prisma.user.findMany();

  // 🔹 Criando Medicamentos para cada usuário
  for (const user of allUsers) {
    await prisma.medication.createMany({
      data: [
        {
          userId: user.id,
          name: encryptData("Metformina"),
          dosage: "500mg",
          frequency: "2 vezes ao dia",
          startDate: new Date("2025-03-19T08:00:00.000Z"),
          endDate: new Date("2025-06-19T08:00:00.000Z"),
        },
        {
          userId: user.id,
          name: encryptData("Insulina Lantus"),
          dosage: "10 UI",
          frequency: "Antes das refeições",
          startDate: new Date("2025-04-01T07:00:00.000Z"),
          endDate: new Date("2025-12-31T07:00:00.000Z"),
        },
      ],
    });
  }

  console.log("✅ Medicamentos criados!");

  // 🔹 Criando Registros de Glicemia para cada usuário
  for (const user of allUsers) {
    await prisma.glycemiaRecord.createMany({
      data: [
        { userId: user.id, value: 110.5, timestamp: new Date() },
        { userId: user.id, value: 95.0, timestamp: new Date() },
        { userId: user.id, value: 87.2, timestamp: new Date() },
        { userId: user.id, value: 102.1, timestamp: new Date() },
        { userId: user.id, value: 115.8, timestamp: new Date() },
        { userId: user.id, value: 98.3, timestamp: new Date() },
        { userId: user.id, value: 105.6, timestamp: new Date() },
        { userId: user.id, value: 92.4, timestamp: new Date() },
        { userId: user.id, value: 89.7, timestamp: new Date() },
        { userId: user.id, value: 111.2, timestamp: new Date() },
      ],
    });
  }

  console.log("✅ Registros de Glicemia criados!");

  // 🔹 Criando Lembretes para os usuários
  const allMedications = await prisma.medication.findMany();
  for (const medication of allMedications) {
    await prisma.reminder.create({
      data: {
        userId: medication.userId,
        medicationId: medication.id,
        message: `Tomar ${decryptData(medication.name)} às 8h`,
        remindAt: new Date("2025-03-20T08:00:00.000Z"),
      },
    });
  }

  console.log("✅ Lembretes criados!");

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((error) => {
    console.error("❌ Erro ao executar seed:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
