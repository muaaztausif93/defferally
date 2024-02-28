import { getDataFromToken } from '@/src/helpers/decode-token';
import { ExchangeService } from '@/src/services/exchange';
import { NextRequest, NextResponse } from 'next/server';

const exchangeService = new ExchangeService();

export async function PUT(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const match = req.url.match(/\/exchanges\/(\d+)/);

    const exchangeId = match ? parseInt(match[1]) : 0;

    const { partyId, ...updatedPartyData } = await req.json();

    const data = await exchangeService.editPartyOfExchange(
      exchangeId,
      partyId,
      updatedPartyData,
    );

    const response = NextResponse.json({
      success: true,
      data,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
