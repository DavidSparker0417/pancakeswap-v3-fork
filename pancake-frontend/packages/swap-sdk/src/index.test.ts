import { expect, test } from 'vitest'
import * as exports from './index'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "ZERO_PERCENT",
      "ONE_HUNDRED_PERCENT",
      "FACTORY_ADDRESS",
      "FACTORY_ADDRESS_MAP",
      "INIT_CODE_HASH",
      "INIT_CODE_HASH_MAP",
      "WETH9",
      "WBNB",
      "WNATIVE",
      "NATIVE",
      "isTradeBetter",
      "ChainId",
      "ERC20Token",
      "OnRampCurrency",
      "computePairAddress",
      "Pair",
      "Route",
      "inputOutputComparator",
      "tradeComparator",
      "Trade",
      "Native",
      "Router",
      "validateAndParseAddress",
      "Ether",
      "Fetcher",
      "BaseCurrency",
      "CurrencyAmount",
      "FIVE",
      "Fraction",
      "InsufficientInputAmountError",
      "InsufficientReservesError",
      "MINIMUM_LIQUIDITY",
      "MaxUint256",
      "NativeCurrency",
      "ONE",
      "Percent",
      "Price",
      "Rounding",
      "TEN",
      "THREE",
      "TWO",
      "Token",
      "TradeType",
      "VMType",
      "VM_TYPE_MAXIMA",
      "ZERO",
      "_100",
      "_10000",
      "_9975",
      "computePriceImpact",
      "getTokenComparator",
      "sortedInsert",
      "sqrt",
      "validateVMTypeInstance",
      "pancakePairV2ABI",
      "erc20ABI",
    ]
  `)
})
