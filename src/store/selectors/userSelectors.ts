import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '@/store/rootReducer.ts';
import {
    getSectorsChartPie,
    getPortfolioChartPie,
    truncateValue,
    getAssetsTypesChartPie,
    recalculateMarketValue,
    recalculateCash,
    getDepositValue
} from '@utils';

export const selectPortfolio = (state: RootState) => state.user.portfolio;
export const selectFormattedPortfolio = (state: RootState) => state.user.formattedPortfolio;
export const selectOperations = (state: RootState) => state.user.operations;
export const selectTotalFee = (state: RootState) => state.user.totalFee;

export const selectCash = createSelector(
    [selectOperations],
    (operations) => recalculateCash(operations),
);

export const selectMarketValue = createSelector(
    [selectPortfolio],
    (portfolio) => recalculateMarketValue(portfolio),
);

export const selectNetAssetValue = createSelector(
    [selectCash, selectMarketValue],
    (cash, marketValue) => truncateValue(cash + marketValue),
);

export const selectDeposit = createSelector(
    [selectOperations],
    (operations) => getDepositValue(operations),
);

export const selectPortfolioChartPie = createSelector(
    [selectPortfolio, selectMarketValue],
    (portfolio, marketValue) => getPortfolioChartPie(portfolio, marketValue),
);

export const selectSectors = createSelector(
    [selectPortfolio, selectMarketValue],
    (portfolio, marketValue) => getSectorsChartPie(portfolio, marketValue),
);

export const selectAssetTypesChartPie = createSelector(
    [selectCash, selectMarketValue],
    (cash, assetsValue) => getAssetsTypesChartPie(cash, assetsValue),
);