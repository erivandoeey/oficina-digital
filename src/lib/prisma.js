import { PrismaClient } from '@prisma/client';

let prisma;

if (typeof globalThis.prisma === 'undefined') {
  prisma = new PrismaClient();
  
  // Em ambientes de desenvolvimento, armazenamos a instância em globalThis para reutilizar a mesma instância
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
  }
} else {
  prisma = globalThis.prisma;
}

export default prisma;
