import prisma from '@/prisma';
import { savePdfFileToLocalPath } from '@/src/helpers/upload-document';
import {
  Exchange,
  ExchangeStatus,
  Party,
  PropertyType,
  Step,
  DocumentType,
} from '@prisma/client';
type PartyWithoutIds = Omit<
  Party,
  'id' | 'uuid' | 'exchangeId' | 'createdAt' | 'updatedAt'
>;

type StepWithoutIds = Omit<
  Step,
  'id' | 'uuid' | 'exchangeId' | 'createdAt' | 'updatedAt' | 'completedAt'
>;

type PdfFile = { type: DocumentType; file: Buffer };

export class ExchangeService {
  async createExchange(
    userId: number,
    type: PropertyType,
    parties: PartyWithoutIds[],
    steps: StepWithoutIds[],
    pdfFiles: PdfFile[],
  ): Promise<Exchange | null> {
    try {
      const exchange = await prisma.exchange.create({
        data: {
          userId: userId,
          type: type,
          stepNumber: 1,
          status: ExchangeStatus.ACTIVE,
          parties: {
            createMany: {
              data: parties.map((party) => ({
                ...party,
              })),
            },
          },
          steps: {
            createMany: {
              data: steps.map((step) => ({
                ...step,
              })),
            },
          },
        },
        include: {
          user: true,
          parties: true,
          steps: true,
        },
      });

      const documents = await prisma.document.createMany({
        data: pdfFiles.map((file) => ({
          type: file.type,
          url: savePdfFileToLocalPath(exchange.id, file.type, file.file),
          exchangeId: exchange.id,
        })),
      });

      const updatedExchange = await prisma.exchange.findUnique({
        where: {
          id: exchange.id,
        },
        include: {
          user: true,
          parties: true,
          steps: true,
          documents: true,
        },
      });

      return updatedExchange;
    } catch (error) {
      console.error('Error creating exchange:', error);
      throw new Error('Error creating exchange');
    }
  }

  async getExchangesByUserId(userId: number): Promise<Exchange[] | null> {
    try {
      const exchanges = await prisma.exchange.findMany({
        where: {
          userId: userId,
        },
        include: {
          documents: true,
          parties: true,
          steps: true,
          user: true,
        },
      });

      return exchanges;
    } catch (error) {
      console.error('Error fetching exchanges:', error);
      throw new Error('Error fetching exchanges');
    }
  }

  async getExchangeById(exchangeId: number): Promise<Exchange | null> {
    try {
      const exchange = await prisma.exchange.findUnique({
        where: {
          id: exchangeId,
        },
        include: {
          documents: true,
          parties: true,
          steps: true,
          user: true,
        },
      });

      return exchange;
    } catch (error) {
      console.error(`Error fetching exchange with id ${exchangeId}:`, error);
      throw new Error(`Error fetching exchange with id ${exchangeId}`);
    }
  }

  async addPartyToExchange(
    exchangeId: number,
    newParty: PartyWithoutIds,
  ): Promise<Exchange | null> {
    try {
      // Fetch the existing exchange to ensure it exists
      const existingExchange = await prisma.exchange.findUnique({
        where: {
          id: exchangeId,
        },
      });

      if (!existingExchange) {
        throw new Error(`Exchange with id ${exchangeId} not found`);
      }

      // Add the new party to the exchange
      const updatedExchange = await prisma.exchange.update({
        where: {
          id: exchangeId,
        },
        data: {
          parties: {
            create: {
              ...newParty,
            },
          },
        },
        include: {
          documents: true,
          parties: true,
          steps: true,
          user: true,
        },
      });

      return updatedExchange;
    } catch (error) {
      console.error(
        `Error adding party to exchange with id ${exchangeId}:`,
        error,
      );
      throw new Error(`Error adding party to exchange with id ${exchangeId}`);
    }
  }

  async editPartyOfExchange(
    exchangeId: number,
    partyId: number,
    updatedPartyData: Party,
  ): Promise<Exchange | null> {
    try {
      // Fetch the existing exchange to ensure it exists
      const existingExchange = await prisma.exchange.findUnique({
        where: {
          id: exchangeId,
        },
      });

      if (!existingExchange) {
        throw new Error(`Exchange with id ${exchangeId} not found`);
      }

      // Edit the party of the exchange
      const updatedExchange = await prisma.exchange.update({
        where: {
          id: exchangeId,
        },
        data: {
          parties: {
            update: {
              where: {
                id: partyId,
              },
              data: updatedPartyData,
            },
          },
        },
        include: {
          documents: true,
          parties: true,
          steps: true,
          user: true,
        },
      });

      return updatedExchange;
    } catch (error) {
      console.error(
        `Error editing party with id ${partyId} of exchange with id ${exchangeId}:`,
        error,
      );
      throw new Error(
        `Error editing party with id ${partyId} of exchange with id ${exchangeId}`,
      );
    }
  }

  async removePartyFromExchange(
    exchangeId: number,
    partyIdToRemove: number,
  ): Promise<Exchange | null> {
    try {
      // Fetch the existing exchange to ensure it exists
      const existingExchange = await prisma.exchange.findUnique({
        where: {
          id: exchangeId,
        },
      });

      if (!existingExchange) {
        throw new Error(`Exchange with id ${exchangeId} not found`);
      }

      // Delete the party from the exchange
      const updatedExchange = await prisma.exchange.update({
        where: {
          id: exchangeId,
        },
        data: {
          parties: {
            delete: {
              id: partyIdToRemove,
            },
          },
        },
        include: {
          documents: true,
          parties: true,
          steps: true,
          user: true,
        },
      });

      return updatedExchange;
    } catch (error) {
      console.error(
        `Error removing party with id ${partyIdToRemove} from exchange with id ${exchangeId}:`,
        error,
      );
      throw new Error(
        `Error removing party with id ${partyIdToRemove} from exchange with id ${exchangeId}`,
      );
    }
  }

  async toggleStepEnabledForExchange(
    exchangeId: number,
    stepId: number,
    isEnabled: boolean,
  ): Promise<Exchange | null> {
    try {
      // Fetch the existing exchange to ensure it exists
      const existingExchange = await prisma.exchange.findUnique({
        where: {
          id: exchangeId,
        },
      });

      if (!existingExchange) {
        throw new Error(`Exchange with id ${exchangeId} not found`);
      }

      // Toggle the is_enabled flag for the step of the exchange
      const updatedExchange = await prisma.exchange.update({
        where: {
          id: exchangeId,
        },
        data: {
          steps: {
            update: {
              where: {
                id: stepId,
              },
              data: {
                isEnabled: isEnabled,
              },
            },
          },
        },
        include: {
          documents: true,
          parties: true,
          steps: true,
          user: true,
        },
      });

      return updatedExchange;
    } catch (error) {
      console.error(
        `Error toggling is_enabled for step with id ${stepId} of exchange with id ${exchangeId}:`,
        error,
      );
      throw new Error(
        `Error toggling is_enabled for step with id ${stepId} of exchange with id ${exchangeId}`,
      );
    }
  }

  async addDocumentToExchange(
    exchangeId: number,
    pdfFile: PdfFile,
  ): Promise<Exchange | null> {
    try {
      const existingExchange = await prisma.exchange.findUnique({
        where: {
          id: exchangeId,
        },
      });

      if (!existingExchange) {
        throw new Error(`Exchange with id ${exchangeId} not found`);
      }

      const updatedExchange = await prisma.exchange.update({
        where: {
          id: exchangeId,
        },
        data: {
          documents: {
            create: {
              type: pdfFile.type,
              url: savePdfFileToLocalPath(
                exchangeId,
                pdfFile.type,
                pdfFile.file,
              ),
            },
          },
        },
        include: {
          user: true,
          parties: true,
          steps: true,
          documents: true,
        },
      });

      return updatedExchange;
    } catch (error) {
      console.error(
        `Error adding document to exchange with id ${exchangeId}:`,
        error,
      );
      throw new Error(
        `Error adding document to exchange with id ${exchangeId}`,
      );
    }
  }

  async deleteDocumentFromExchange(
    exchangeId: number,
    documentId: number,
  ): Promise<Exchange | null> {
    try {
      const existingExchange = await prisma.exchange.findUnique({
        where: {
          id: exchangeId,
        },
      });

      if (!existingExchange) {
        throw new Error(`Exchange with id ${exchangeId} not found`);
      }

      const updatedExchange = await prisma.exchange.update({
        where: {
          id: exchangeId,
        },
        data: {
          documents: {
            delete: {
              id: documentId,
            },
          },
        },
        include: {
          user: true,
          parties: true,
          steps: true,
          documents: true,
        },
      });

      return updatedExchange;
    } catch (error) {
      console.error(
        `Error deleting document with id ${documentId} from exchange with id ${exchangeId}:`,
        error,
      );
      throw new Error(
        `Error deleting document with id ${documentId} from exchange with id ${exchangeId}`,
      );
    }
  }
}
