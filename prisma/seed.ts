import { PrismaClient } from '@prisma/client';
import { decryptData, encryptData } from '../src/middleware/encryptionMiddleware';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🟢 Populando o banco de dados...");

  // 🔐 Criando senhas seguras
  const hashedPassword = await bcrypt.hash('123456', 10);

  // 🔹 Criando Usuários
  const diabetesTypes = await prisma.diabetesType.createMany({
    data: [
      { name: "Diabetes Tipo 1" },
      { name: "Diabetes Tipo 2" },
      { name: "Diabetes Gestacional" },
      { name: "Diabetes Mody" },
      { name: "Diabetes LADA" }
    ],
  });

  console.log("✅ Tipos de Diabetes criados!");

  // 🔹 Criando Usuários
  const users = await prisma.user.createMany({
    data: [
      { email: "ana.silva@gmail.com", password: hashedPassword, name: "Ana Silva", diagnosisYear: 2010, gender: "feminino", phone: "11999999999", diabetesTypeId: 1 },
      { email: "carlos.souza@gmail.com", password: hashedPassword, name: "Carlos Souza", diagnosisYear: 2015, gender: "masculino", phone: "11988888888", diabetesTypeId: 2 },
      { email: "fernanda.lima@gmail.com", password: hashedPassword, name: "Fernanda Lima", diagnosisYear: 2020, gender: "feminino", phone: "11977777777", diabetesTypeId: 3 },
      { email: "joao.pereira@gmail.com", password: hashedPassword, name: "João Pereira", diagnosisYear: 2018, gender: "masculino", phone: "11966666666", diabetesTypeId: 4 },
      { email: "maria.oliveira@gmail.com", password: hashedPassword, name: "Maria Oliveira", diagnosisYear: 2012, gender: "feminino", phone: "11955555555", diabetesTypeId: 5 },
      { email: "lucas.martins@gmail.com", password: hashedPassword, name: "Lucas Martins", diagnosisYear: 2016, gender: "masculino", phone: "11944444444", diabetesTypeId: 1 },
      { email: "camila.rodrigues@gmail.com", password: hashedPassword, name: "Camila Rodrigues", diagnosisYear: 2017, gender: "feminino", phone: "11933333333", diabetesTypeId: 2 },
      { email: "rafael.ferreira@gmail.com", password: hashedPassword, name: "Rafael Ferreira", diagnosisYear: 2019, gender: "masculino", phone: "11922222222", diabetesTypeId: 3 },
      { email: "isabela.moura@gmail.com", password: hashedPassword, name: "Isabela Moura", diagnosisYear: 2021, gender: "feminino", phone: "11911111111", diabetesTypeId: 4 },
      { email: "pedro.alves@gmail.com", password: hashedPassword, name: "Pedro Alves", diagnosisYear: 2022, gender: "masculino", phone: "11900000000", diabetesTypeId: 5 },
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

  for (const user of allUsers) {
    // 🔹 Criando registros de peso
    await prisma.weightRecord.createMany({
      data: [
        { userId: user.id, weight: 60, timestamp: new Date(`2024-03-18T08:00:00Z`) },
        { userId: user.id, weight: 61, timestamp: new Date(`2024-03-18T08:00:00Z`) },
      ],
    });
  }

  console.log("✅ Pesos criados!");

  for (const user of allUsers) {
    // 🔹 Criando registros de altura
    await prisma.heightRecord.createMany({
      data: [
        { userId: user.id, height: 1.50 * 1.02, timestamp: new Date(`2024-03-18T08:00:00Z`) },
        { userId: user.id, height: 1.50 * 1.03, timestamp: new Date(`2024-03-18T08:00:00Z`) }
      ]
    });
  }

  console.log("✅ Alturas criados!");

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

  // 🔹 Criando Registros de Hemoglobina Glicada para cada usuário
  for (const user of allUsers) {
    await prisma.glycatedHemoglobinRecord.createMany({
      data: [
        { userId: user.id, percentage: 6.5, timestamp: new Date() },
        { userId: user.id, percentage: 7.2, timestamp: new Date() },
        { userId: user.id, percentage: 6.8, timestamp: new Date() },
        { userId: user.id, percentage: 7.5, timestamp: new Date() },
        { userId: user.id, percentage: 7.9, timestamp: new Date() },
        { userId: user.id, percentage: 6.3, timestamp: new Date() },
        { userId: user.id, percentage: 7.0, timestamp: new Date() },
        { userId: user.id, percentage: 6.6, timestamp: new Date() },
        { userId: user.id, percentage: 7.8, timestamp: new Date() },
        { userId: user.id, percentage: 6.9, timestamp: new Date() },
      ],
    });
  }

  console.log("✅ Registros de Hemogobina Gicada criados!");

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

  console.log("✅ Medicamentos criados!");

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((error) => {
    console.error("❌ Erro ao executar seed:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
